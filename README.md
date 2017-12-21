# cognito-auth-example
Cognito Authentication Example w/ React

# Installation

## Clone repository

```bash
$ git clone git@github.com:shunta27/cognito-auth-example.git
```

## Install Required Packages

```bash
$ cd cognito-auth-example
$ npm install
```

# Usage

## Environment Varilables(.env.default)
- PORT: (Optional) Express Port Number
- REGION: AWS Cognito Region
- COGNITO_IDENTITY_POOL_ID: Cognito Identity Pool ID
- COGNITO_USER_POOL_ID: User Pool ID
- COGNITO_APP_CLIENT_ID: App Client ID
- DEFAULT_USERNAME: Default Username for Sign In
- DEFAULT_PASSWORD: Default Password for Sign In
- INVOKE_URL_GET: AWS API Gateway Invoke URL
- INVOKE_URL_POST: AWS API Gateway Invoke URL
- INVOKE_URL_PUT: AWS API Gateway Invoke URL
- INVOKE_URL_DELETE: AWS API Gateway Invoke URL

## Run

```bash
$ npm run start
```
## Contributors

ichikawa shunta <shunta27ichikawa@gmail.com>
