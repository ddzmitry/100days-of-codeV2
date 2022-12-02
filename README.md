# 100days-of-codeV2



#### Day 1 Dynamo Starter
> Dynamo DB Inverted Index Research + CRUD with Deep Index Understanding 
> Conrinue on Udemy Course [The Complete Guide to Build Serverless Applications on AWS](https://allylearning.udemy.com/course/building-rest-apis-with-serverless) 

#### Day 2 Serverless Framework API GW 
> Serverless  [Setup](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/)  
> Conrinue on Udemy Course [The Complete Guide to Build Serverless Applications on AWS](https://allylearning.udemy.com/course/building-rest-apis-with-serverless) 
> Timeout issues DynamoDB
> Helpfull Commands
```bash
serveress create -t aws-nodejs (Start Project)
```
> Helpful notes
```
ConditionExpression: "attribute_not_exists(hashkey)" - allows not to use duplicates
ConditionExpression: "attribute_exists(hashkey)" - allows not to update ONLY if exists 

context.callbackWaitsForEmptyEventLoop = false – Set to false to send the response right away when the callback runs, instead of waiting for the Node.js event loop to be empty. If this is false, any outstanding events continue to run during the next invocation.

```
> Links 
```
Reusing connections (DynamoDB) : https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-reusing-connections.html
How to fix DynamoDB timeouts in Serverless apps : https://seed.run/blog/how-to-fix-dynamodb-timeouts-in-serverless-application.html
```

####  Day 3  Serverless authorizer and user pools 
> If you pass in context of authorizer value then you can share it to event of lambda of incoming request
```javascript

// in authorizer 
  authReponse.context = {
    foo: "bar",
  };
// in lambda of incoming request
event.requestContext.authorizer.foo // === "bar"  
```
>Links and notes
```
Amazon Cognito Hosted UI : https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-app-integration.html 
https://<your_domain>/login?response_type=token&client_id=<your_app_client_id>&redirect_uri=<your_callback_url>

<!-- Example calling cognito -->
https://ddzmitryauth-production.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=40gtgdr5epltjsl3r1msrsm8vl&redirect_uri=http://localhost:3000 

Example callback
http://localhost:3000/#id_token=SOMECOOLJWTTOKEN&expires_in=3600&token_type=Bearer




```

####  Day 4  Serverless Using Environment Variables and Setting up github actions
```bash
# To get serverless Starter for github actions https://github.com/marketplace?type=&verification=&query=serverless+ 
# to remove resources 
sls remove
sls remove --stage demo
```

####  Day 5  Testing with Jest and Caching on API GW 
> Gotcha API GW authorizer caches session and need to be set TTL to equal 0 , that way we can  test requests properly. (bad fix )
> https://aws.amazon.com/premiumsupport/knowledge-center/api-gateway-lambda-authorization-errors/ ( GOOD fix)

```javascript
// "arn:aws:execute-api:<region>:<account>:<API_id>/<stage>/<http-method>/[<resource-path-name>/[<child-resources-path>]"
    const tmp = event.methodArn.split(':');
    const apiGatewayArnTmp = tmp[5].split('/');

    // Create wildcard resource
    const resource = tmp[0] + ":" + tmp[1] + ":" + tmp[2] + ":" + tmp[3] + ":" + tmp[4] + ":" + apiGatewayArnTmp[0] + '/*/*'; 
```
