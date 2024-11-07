# RealChat

[![Build status](https://img.shields.io/circleci/build/github/realchat/realchat-web/master)](https://circleci.com/gh/realchat/realchat-web)
[![License](https://img.shields.io/badge/License-AGPLv3-blue.svg)](https://github.com/realchat/realchat-web/blob/master/LICENSE.txt)
[![Docker Image](https://img.shields.io/badge/docker%20image-realchat%2Frealchat--web-yellow.svg)](https://hub.docker.com/r/realchat/realchat-web)

RealChat is a privacy-focused end-to-end encrypted instant messaging application. Its unique features include:

1. **WorldID Biometric Authentication**: 
   - Uses WorldID's biometric technology for identity verification
   - Ensures every user is a real human, not a bot or AI
   - Effectively prevents romance scams and fake accounts

2. **End-to-End Encryption**:
   - All messages are end-to-end encrypted
   - Uses [WebRTC](https://webrtc.org/) for secure connections
   - Data transmission encrypted with [SaltyRTC](https://saltyrtc.org/)

3. **Complete Anonymity**:
   - WorldID only verifies human identity, no personal information leaked
   - Users can chat completely anonymously
   - Ensures authenticity while protecting privacy

4. **Cross-Platform Support**:
   - Supports Web, Android and iOS
   - Encrypted data synchronization
   - Secure chat anywhere, anytime

[https://realchat.world](https://realchat.world/)

![Screenshot](https://realchat.world/images/webclient_header.png)

## Team Information

**Project Members**

- Name: Yiko Song
  - Discord Username: Yiko
  - Devfolio Username: Yiko
  - Github Username: TecSong
  - Role: Lead Developer

## Technical Approach

- **Components**
  - [x] Frontend (TypeScript + AngularJS)


### Technical Features

- WorldID biometric authentication
- WebRTC end-to-end encrypted communication
- SaltyRTC signaling encryption
- TypeScript + AngularJS development
- PWA offline support


## Project Goals & Future Plans

- Continue developing enhanced privacy features
- Expand WorldID integration capabilities
- Build larger community of privacy-focused users
- Seeking contributors for:
  - Mobile app development
  - Security auditing
  - UI/UX improvements

## Lessons Learned

- Implementing end-to-end encryption requires careful architectural planning
- WorldID integration provides strong anti-bot protection while maintaining privacy
- WebRTC + SaltyRTC combination offers excellent security for real-time communication
- Key reusable components:
  - WorldID authentication module
  - E2E encryption layer
  - Real-time messaging infrastructure

## Development Guide

RealChat is developed using TypeScript and AngularJS. You need Node.js 18 to build the project.

If your default NodeJS version is not 18, use nvm to install it:

```bash
nvm install
nvm use
```

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run devserver
```

Then open the URL in your browser:

```bash
firefox http://localhost:9966
```

### Testing

To run unit tests:

```bash
npm run build:unittests && npm run testserver
firefox http://localhost:7777/tests/testsuite.html
```

To run UI tests:

```bash
npm run build  # Required for CSS to be rebuilt
npm run test:ui <browser>
```

For example:

```bash
npm run test:ui firefox
npm run test:ui chrome
```

You can also filter the test cases:

```bash
npm run test:ui firefox emoji
```

To run linting checks:

```bash
npm run lint
```

### Configuration

The configuration can be customized in several ways:

1. Environment variables
2. `userconfig.js` file
3. Docker environment variables
4. `userconfig.overrides.js` file

### Docker Support

Build the Docker image:

```bash
docker build -t realchat/realchat-web .
```

Run with Docker:

```bash
docker run -p 8080:80 \
  -e AUTH0_DOMAIN=your-domain \
  -e AUTH0_CLIENT_ID=your-client-id \
  -e WORLDID_APP_ID=your-app-id \
  realchat/realchat-web
```

### Contributing

1. Fork the repository
2. Create your feature branch
3. Write tests for your changes
4. Ensure all tests pass
5. Submit a pull request

Please follow our coding standards and include appropriate tests.

### Security

- All releases are signed with PGP
- Security issues should be reported to security@realchat.world
- Regular security audits are performed

For more details, see our [Security Policy](SECURITY.md).

## Project Links

- Website: https://realchat.world
- Documentation: [RealChat Encryption Whitepaper](https://realchat.world/whitepaper.pdf)
- Source Code: [GitHub Repository](https://github.com/realchat/realchat-web)

## Video Demo

[Demo video link to be added]