import { APIGatewayEvent, Context, APIGatewayTokenAuthorizerEvent,PolicyDocument,AuthResponse } from "aws-lambda";


const { CognitoJwtVerifier } = require("aws-jwt-verify");

console.log({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "id",
  clientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
})
const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "id",
  clientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
});

const generatePolicy = (principalId, effect, resource): AuthResponse => {
  let tmp = resource.methodArn.split(':');
  const apiGatewayArnTmp = tmp[5].split('/');
  // Create wildcard resource
  resource = tmp[0] + ":" + tmp[1] + ":" + tmp[2] + ":" + tmp[3] + ":" + tmp[4] + ":" + apiGatewayArnTmp[0] + '/*/*';   
  var authReponse = {} as AuthResponse;
  authReponse.principalId = principalId;
  
  if (effect && resource) {
    let policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: effect,
          Resource: resource,
          Action: "execute-api:Invoke",
        },
      ],
    };
    authReponse.policyDocument = policyDocument;
  }
  authReponse.context = {
    foo: "bar",
  };
  console.log(JSON.stringify(authReponse));
  return authReponse;
};

export const handler = async (  event: APIGatewayTokenAuthorizerEvent,
  context: Context,
  callback: any) => {
  // lambda authorizer code
  var token = event.authorizationToken;
  console.log(token);
  // Validate the token
  try {
    const payload = await jwtVerifier.verify(token);
    console.log(JSON.stringify(payload));
    callback(null, generatePolicy("user", "Allow", event.methodArn));
  } catch(err) {
    callback("Error: Invalid token");
  }
};