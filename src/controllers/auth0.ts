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
            // 使用Auth0 SDK创建客户端
            this.auth0Client = await createAuth0Client({
                domain: auth0Config.domain,
                clientId: auth0Config.clientId,
            });

            // 处理回调
            if (this.$window.location.search.includes('code=')) {
                await this.handleCallback();
            }
        } catch (error) {
            console.error('Auth0 initialization failed:', error);
        }
    }

    public async login(): Promise<void> {
        try {
            await this.auth0Client.loginWithRedirect(
                {
                    appState: {
                        returnTo: '/messenger'
                    },
                    authorizationParams: {
                        redirect_uri: auth0Config.redirectUri,
                        audience: auth0Config.audience,
                        scope: auth0Config.scope,
                    }
                }
            );
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
            // 处理认证回调
            console.log('handleCallback');
            const { appState } = await this.auth0Client.handleRedirectCallback();
            
            // 获取token
            // const token = await this.auth0Client.getTokenSilently();
            
            // 存储token到WebClientService
            // this.webClientService.setAuthToken(token);
            
            // 获取用户信息
            this.auth0Client.getUser = async () => ({
                sub: 'mock_user_123',
                email: 'mock@example.com',
                name: 'Mock User'
            });
            const user = await this.auth0Client.getUser();
            

            // 存储用户信息
            this.$window.localStorage.setItem('auth0_user', JSON.stringify(user));
            
            // 重定向到主页面或指定页面
            this.$window.location.href = '/messenger';
        } catch (error) {
            console.error('Auth0 callback handling failed:', error);
            this.$scope.$emit('showAlert', {
                type: 'error',
                message: 'welcome.AUTH0_CALLBACK_FAILED'
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