import { createAuth0Client } from "@auth0/auth0-spa-js";
import { auth0Config } from "../config";

export class Auth0Controller {
    public static $inject = ['$scope', '$window', 'WebClientService'];
    
    private auth0Client: any;
    
    constructor(
        private $scope: ng.IScope,
        private $window: ng.IWindowService,
        private webClientService: threema.WebClientService,
    ) {
        // 初始化Auth0配置
        this.initAuth0();
    }

    private async initAuth0(): Promise<void> {
        try {
            // 添加更多配置选项
            this.auth0Client = await createAuth0Client({
                domain: auth0Config.domain,
                clientId: auth0Config.clientId,
                authorizationParams: {
                    redirect_uri: window.location.origin,
                },
                // 添加缓存配置
                // cacheLocation: 'localstorage', // 或 'memory'
                // useCookiesForTransactions: true
            });

            // // 建议添加用户会话检查
            // const isAuthenticated = await this.auth0Client.isAuthenticated();
            // if (isAuthenticated) {
            //     const user = await this.auth0Client.getUser();
            //     // 恢复用户会话
            //     this.$window.localStorage.setItem('auth0_user', JSON.stringify(user));
            //     const token = await this.auth0Client.getTokenSilently();
            //     this.webClientService.setAuthToken(token);
            // }

            if (this.$window.location.search.includes('code=')) {
                // 添加状态检查
                if (this.$window.location.search.includes('state=')) {
                    await this.handleCallback();
                } else {
                    console.error('Missing state parameter');
                    throw new Error('Invalid authentication state');
                }
            }
        } catch (error) {
            console.error('Auth0 initialization failed:', error);
        }
    }

    public async login(): Promise<void> {
        try {
            await this.auth0Client.loginWithRedirect();
        } catch (error) {
            console.error('Auth0 login failed:', error);
            this.$scope.$emit('showAlert', {
                type: 'error',
                message: 'welcome.AUTH0_LOGIN_FAILED'
            });
        }
    }

    private async handleCallback(): Promise<void> {
        try {
            console.log('start handleCallback');
            
            // 处理回调并验证结果
            const result = await this.auth0Client.handleRedirectCallback();
            if (!result || !result.appState) {
                throw new Error('Invalid redirect callback response');
            }
            const { appState } = result;
            
            // 获取并验证 token
            const token = await this.auth0Client.getTokenSilently();
            if (!token) {
                throw new Error('Failed to obtain access token');
            }
            
            // 存储 token
            this.webClientService.setAuthToken(token);
            
            // 获取用户信息
            const user = await this.auth0Client.getUser();
            if (!user) {
                throw new Error('Failed to obtain user information');
            }
            
            // 存储用户信息
            this.$window.localStorage.setItem('auth0_user', JSON.stringify(user));
            
            // 重定向前清理 URL 中的认证参数
            const cleanUrl = window.location.origin + '/messenger';
            window.history.replaceState({}, document.title, cleanUrl);
            
            // 重定向到主页面
            this.$window.location.href = '/messenger';
        } catch (error) {
            console.error('Auth0 callback handling failed:', error);
            this.$scope.$emit('showAlert', {
                type: 'error',
                message: `welcome.AUTH0_CALLBACK_FAILED: ${error.message || 'Unknown error'}`
            });
        }
    }

    public async logout(): Promise<void> {
        try {
            await this.auth0Client.logout({
                logoutParams: {
                    returnTo: window.location.origin
                }
            });
        } catch (error) {
            console.error('Auth0 logout failed:', error);
        }
    }
} 