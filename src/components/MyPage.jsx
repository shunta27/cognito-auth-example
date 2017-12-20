//====================================================================================================
//        File: components/MyPage.jsx
// Description: MyPage Component
//====================================================================================================

//====================================================================================================
// Libralies
//====================================================================================================
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import apigClientFactory from 'aws-api-gateway-client';

//====================================================================================================
// Component
//====================================================================================================
class MyPage extends React.Component {

  constructor(props) {
    super(props);

    this.getUserPool = this.getUserPool.bind(this);
    this.getCognitoUser = this.getCognitoUser.bind(this);
    this.getUserAttributes = this.getUserAttributes.bind(this);
    this.onSignOut = this.onSignOut.bind(this);

    // Call Methods
    this.onCallApi = this.onCallApi.bind(this);
    this.onCallApi_POST = this.onCallApi_POST.bind(this);
    this.onCallApi_PUT = this.onCallApi_PUT.bind(this);
    this.onCallApi_DELETE = this.onCallApi_DELETE.bind(this);
  }

  componentWillMount(){
    this.cognitoUser = this.signInCheck();
  }

  signInCheck(){

    let _this = this;

    let userPool = this.getUserPool();
    let cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
      browserHistory.push("/");
      return;
    }

    cognitoUser.getSession(function(error, session) {
      if(error) {
        console.log(error);
        browserHistory.push("/");
        return;
      }
      if(session) {
        _this.getUserAttributes(cognitoUser);
      }
    });

    return cognitoUser;
  }

  getUserAttributes(cognitoUser){

    let _this = this;

    cognitoUser.getUserAttributes(function(error, attributes) {

      let attributeRecords = [];
      for(let attribute of attributes) {

        let attributeRecord = {
          name: attribute.getName(),
          value: attribute.getValue()
        };

        attributeRecords.push(attributeRecord);
      }

      _this.refs.attributes.innerText = JSON.stringify(attributeRecords);

    });

  }

  getUserPool(){

    const userPoolData = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_APP_CLIENT_ID
    };

    let userPool = new CognitoUserPool(userPoolData);

    return userPool;
  }

  getCognitoUser(username, userPool){

    let cognitoUserData = {
      Username : username,
      Pool : userPool
    };

    let cognitoUser = new CognitoUser(cognitoUserData);

    return cognitoUser;
  }

  onCallApi(){

    let _this = this;

    _this.refs.apiResponse.innerHTML = '';

    let apigClientConfig = {
      invokeUrl: process.env.INVOKE_URL_GET
    };
    let apigClient = apigClientFactory.newClient(apigClientConfig);

    let invokeConfig = {
      //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
      params : {

      },
      // Template syntax follows url-template https://www.npmjs.com/package/url-template
      pathTemplate : '/',
      method : 'GET',
      //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
      additionalParams : {
        headers: {
            Authorize: this.cognitoUser.signInUserSession.idToken.jwtToken
        }
      },
      //This is where you define the body of the request
      body : {

      }
    };

    // Invoke
    apigClient.invokeApi(
      invokeConfig.params,
      invokeConfig.pathTemplate,
      invokeConfig.method,
      invokeConfig.additionalParams,
      invokeConfig.body)
    .then(function(result){
      //This is where you would put a success callback
      console.log(result);
      _this.refs.apiResponse.innerHTML = result.data.status;
    })
    .catch(function(result){
      //This is where you would put an error callback
      console.log(result);
    });
  }

  onCallApi_POST(){
    let _this = this;

    _this.refs.apiResponse.innerHTML = '';

    let apigClientConfig = {
      invokeUrl: process.env.INVOKE_URL_POST
    };
    let apigClient = apigClientFactory.newClient(apigClientConfig);

    let invokeConfig = {
      params : {

      },
      pathTemplate : '/',
      method : 'POST',
      additionalParams : {
        headers: {
            Authorize: this.cognitoUser.signInUserSession.idToken.jwtToken
        }
      },
      body : {

      }
    };

    // Invoke
    apigClient.invokeApi(
      invokeConfig.params,
      invokeConfig.pathTemplate,
      invokeConfig.method,
      invokeConfig.additionalParams,
      invokeConfig.body)
    .then(function(result){
      //This is where you would put a success callback
      console.log(result);
      _this.refs.apiResponse_POST.innerHTML = result.data.status;
    })
    .catch(function(result){
      //This is where you would put an error callback
      console.log(result);
    });
  }

  onCallApi_PUT(){
    let _this = this;

    _this.refs.apiResponse.innerHTML = '';

    let apigClientConfig = {
      invokeUrl: process.env.INVOKE_URL_PUT
    };
    let apigClient = apigClientFactory.newClient(apigClientConfig);

    let invokeConfig = {
      params : {

      },
      pathTemplate : '/',
      method : 'PUT',
      additionalParams : {
        headers: {
            Authorize: this.cognitoUser.signInUserSession.idToken.jwtToken
        }
      },
      body : {

      }
    };

    // Invoke
    apigClient.invokeApi(
      invokeConfig.params,
      invokeConfig.pathTemplate,
      invokeConfig.method,
      invokeConfig.additionalParams,
      invokeConfig.body)
    .then(function(result){
      //This is where you would put a success callback
      console.log(result);
      _this.refs.apiResponse_PUT.innerHTML = result.data.status;
    })
    .catch(function(result){
      //This is where you would put an error callback
      console.log(result);
    });
  }

  onCallApi_DELETE(){
    let _this = this;

    _this.refs.apiResponse.innerHTML = '';

    let apigClientConfig = {
      invokeUrl: process.env.INVOKE_URL_DELETE
    };
    let apigClient = apigClientFactory.newClient(apigClientConfig);

    let invokeConfig = {
      params : {

      },
      pathTemplate : '/',
      method : 'DELETE',
      additionalParams : {
        headers: {
            Authorize: this.cognitoUser.signInUserSession.idToken.jwtToken
        }
      },
      body : {

      }
    };

    // Invoke
    apigClient.invokeApi(
      invokeConfig.params,
      invokeConfig.pathTemplate,
      invokeConfig.method,
      invokeConfig.additionalParams,
      invokeConfig.body)
    .then(function(result){
      //This is where you would put a success callback
      console.log(result);
      _this.refs.apiResponse_DELETE.innerHTML = result.data.status;
    })
    .catch(function(result){
      //This is where you would put an error callback
      console.log(result);
    });
  }

  onSignOut(){
    this.cognitoUser.signOut();
    browserHistory.push("/");
  }

  render() {
    return (
      <div className="myPage">
        - My Page -<br/>
        <br/>
        <div ref="attributes"></div><br/>
        <br/>

        <div>{process.env.INVOKE_URL_GET}</div>
        <RaisedButton label="Call API (GET)" fullWidth={true} onTouchTap={this.onCallApi} /><br/>
        <div ref="apiResponse"></div><br/>

        <div>{process.env.INVOKE_URL_POST}</div>
        <RaisedButton label="Call API (POST)" fullWidth={true} onTouchTap={this.onCallApi_POST} /><br/>
        <div ref="apiResponse_POST"></div><br/>

        <div>{process.env.INVOKE_URL_PUT}</div>
        <RaisedButton label="Call API (PUT)" fullWidth={true} onTouchTap={this.onCallApi_PUT} /><br/>
        <div ref="apiResponse_PUT"></div><br/>

        <div>{process.env.INVOKE_URL_DELETE}</div>
        <RaisedButton label="Call API (DELETE)" fullWidth={true} onTouchTap={this.onCallApi_DELETE} /><br/>
        <div ref="apiResponse_DELETE"></div><br/>

        <br/>
        <RaisedButton label="Sign Out" fullWidth={true} onTouchTap={this.onSignOut} />
      </div>
    );
  }
}

export default MyPage;
