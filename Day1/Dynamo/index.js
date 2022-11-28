const { uuid } = require("uuidv4");
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamo = new AWS.DynamoDB.DocumentClient();
// 1. Create an organization
// const orgid = uuid()
// var params = {
//     TableName : 'happy-projects',
//     Item: {
//        PK: `ORG#${orgid}`,
//        SK: `#METADATA#${orgid}`,
//        name : `ABC Inc`,
//        tier : 'professional'
//     }
//   };

//   dynamo.put(params, function(err, data) {
//     if (err) console.log(err);
//     else console.log(data);
//   });

// 2. Create a agile Project in Happy Inc .
// const happyIncOrgId = '190d8119-ffd4-4458-aefb-c5d531fd6145'
// const projectID = uuid()
// var params = {
//     TableName : 'happy-projects',
//     Item: {
//        PK: `ORG#${happyIncOrgId}`,
//        SK: `PRO#agile#${projectID}`,
//     //    SK: `PRO#fixed-bid#${projectID}`,
//        name : `Project B`,
//        project_id : projectID
//     }
//   };

//   dynamo.put(params, function(err, data) {
//     if (err) console.log(err);
//     else console.log(data);
//   });

// Edit an Organization
// const ABCorgId = "190d8119-ffd4-4458-aefb-c5d531fd6145"
// var params = {
//   TableName: "happy-projects",
//   Key: { PK: `ORG#${ABCorgId}` , SK:`#METADATA#${ABCorgId}` },
//   UpdateExpression: "set #org_id = :org_id",
//   ExpressionAttributeNames: { "#org_id": ":org_id" },
//   ExpressionAttributeValues: {
//     ":org_id": ABCorgId
//   },
// };

// var documentClient = new AWS.DynamoDB.DocumentClient();

// documentClient.update(params, function (err, data) {
//   if (err) console.log(err);
//   else console.log(data);
// });

// 4. Find an organizatin

// var params = {
//     TableName : 'happy-projects',
//     Key: {
//       PK: 'ORG#1e7fa31a-fab8-4474-ad4b-10767275e9d1',
//       SK: '#METADATA#1e7fa31a-fab8-4474-ad4b-10767275e9d1'
//     }
//   };

//   var documentClient = new AWS.DynamoDB.DocumentClient();

//   documentClient.get(params, function(err, data) {
//     if (err) console.log(err);
//     else console.log(data);
//   });

// 5. Find all projects for Happy INC

// var params = {
//   TableName: "happy-projects",
//   KeyConditionExpression: "#PK = :PK and begins_with(#SK, :SK)",
//   ExpressionAttributeNames: {
//     "#PK": "PK",
//     "#SK": "SK",
//   },
//   ExpressionAttributeValues: {
//     ":PK": "ORG#1e7fa31a-fab8-4474-ad4b-10767275e9d1",
//     ":SK": `PRO#`,
//   },
// };

// var documentClient = new AWS.DynamoDB.DocumentClient();

// documentClient.query(params, function (err, data) {
//   if (err) console.log(err);
//   else console.log(data);
// });

// 6. Create Employee
// const happyIncOrgId = '190d8119-ffd4-4458-aefb-c5d531fd6145'
// const JoeID = uuid()
// var params = {
//     TableName : 'happy-projects',
//     Item: {
//        PK: `ORG#${happyIncOrgId}`,
//        SK: `EMP#${JoeID}`,
//        name : `Jane Smith`,
//        name : `JaneSmith@test.com`,
//     }
//   };

//   dynamo.put(params, function(err, data) {
//     if (err) console.log(err);
//     else console.log(data);
//   });

// Assign Employee to a project
// const happyIncOrgId = "190d8119-ffd4-4458-aefb-c5d531fd6145";
// const projectY = "99c3ab9e-6aa7-4795-a3d9-edaff892bff1";
// const projectX = "f2048bd4-e33c-47f3-91d8-54f28141c6af";
// const projectF = "98481a80-e3de-41e4-ae69-de4361300ffa";

// const jane = "2b9e3055-5e1a-47f9-b68b-025ea34a6089"
// const joe = "089451de-5bb9-4c9d-85a3-69a5acc7c326"
// const jon = "abd1bcf6-5bfd-42a0-ac64-b216ddb38601"

// var params = {
//     TableName : 'happy-projects',
//     Item: {
//        PK: `ORG#${happyIncOrgId}#PRO#${projectY}`,
//        SK: `ORG#${happyIncOrgId}#EMP#${jane}`,
//        name : "JenH",
//        project : "Project Y",
//        date_of_join : new Date().toUTCString()
//     }
//   };

// dynamo.put(params, function (err, data) {
//   if (err) console.log(err);
//   else console.log(data);
// });

// 7. Find Employees Assigned to a specific project 
// const happyIncOrgId = "190d8119-ffd4-4458-aefb-c5d531fd6145";
// const projectX = "f2048bd4-e33c-47f3-91d8-54f28141c6af";
// var params = {
//     TableName: "happy-projects",
//     KeyConditionExpression: "#PK = :PK",
//     ExpressionAttributeNames: {
//       "#PK": "PK",
//     },
//     ExpressionAttributeValues: {
//       ":PK": `ORG#${happyIncOrgId}#PRO#${projectX}`,
//     },
//   };
  
//   var documentClient = new AWS.DynamoDB.DocumentClient();
  
//   documentClient.query(params, function (err, data) {
//     if (err) console.log(err);
//     else console.log(data);
//   });


//  8. Find Projects Which User part of using INVERTED INDEX

// const happyIncOrgId = "190d8119-ffd4-4458-aefb-c5d531fd6145";
// const projectX = "f2048bd4-e33c-47f3-91d8-54f28141c6af";
// const jane = "2b9e3055-5e1a-47f9-b68b-025ea34a6089"
// const joe = "089451de-5bb9-4c9d-85a3-69a5acc7c326"
// const jon = "abd1bcf6-5bfd-42a0-ac64-b216ddb38601"
// var params = {
//     TableName: "happy-projects",
//     IndexName : "SK-PK-index",    
//     KeyConditionExpression: "#SK = :SK",
//     ExpressionAttributeNames: {
//       "#SK": "SK",
//     },
//     ExpressionAttributeValues: {
//       ":SK": `ORG#${happyIncOrgId}#EMP#${jane}`,
//     },
//   };
  
//   var documentClient = new AWS.DynamoDB.DocumentClient();
  
//   documentClient.query(params, function (err, data) {
//     if (err) console.log(err);
//     else console.log(data);
//   });

// 9. Search by GSI
const happyIncOrgId = "190d8119-ffd4-4458-aefb-c5d531fd6145";
var params = {
    TableName: "happy-projects",
    IndexName : "PK-Data-index",    
    KeyConditionExpression: "#PK = :PK and begins_with(#SK, :SK)",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#SK": "Data",
    },
    ExpressionAttributeValues: {
      ":PK": `ORG#${happyIncOrgId}`,
      ":SK": `EMP#J`
    },
  };
  
  var documentClient = new AWS.DynamoDB.DocumentClient();
  
  documentClient.query(params, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
  });