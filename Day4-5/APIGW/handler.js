"use strict";
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
var documentClient = new AWS.DynamoDB.DocumentClient({
  httpOptions: {
    timeout: 5000
  },
  maxRetries: 3
});
const NOTES_TABLE_NAME = process.env.NOTES_TABLE_NAME;
const send = (statusCode, data) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(data),
  };
};
module.exports.createNote = async (event, context, cb) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let data = JSON.parse(event.body);
  try {
    var params = {
      TableName: NOTES_TABLE_NAME,
      Item: {
        notesId: data.id,
        title: data.title,
        body: data.body,
      },
      // to prevent duplicates
      ConditionExpression: "attribute_not_exists(notesId)",
    };
    console.log(params);
    await documentClient.put(params).promise();

    cb(null, {
      statusCode: 201,
      body: JSON.stringify(data),
    });
  } catch (error) {
    cb(null, {
      statusCode: 500,
      body: JSON.stringify(error.message),
    });
  }
};

module.exports.updateNote = async (event, context, cb) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let notesId = event.pathParameters.id;
  let data = JSON.parse(event.body);

  try {
    var params = {
      TableName: NOTES_TABLE_NAME,
      Key: {
        notesId,
      },
      UpdateExpression: "set #title = :title, #body = :body",
      ExpressionAttributeNames: {
        "#title": "title",
        "#body": "body",
      },
      ExpressionAttributeValues: {
        ":title": data.title,
        ":body": data.body,
      },
      ConditionExpression: "attribute_exists(notesId)",
    };
    await documentClient.update(params).promise();
    cb(null, send(200, data));
  } catch (error) {
    cb(null, send(500, error.message));
  }
};

module.exports.deleteNote = async (event, context, cb) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let notesId = event.pathParameters.id;

  try {
    let params = {
      TableName: NOTES_TABLE_NAME,
      Key: {
        notesId
      },
      ConditionExpression: "attribute_exists(notesId)",
    }
    await documentClient.delete(params).promise();
    cb(null, send(200, `Note ${notesId} Was deleted`));
  } catch (error) {
    cb(null, send(500, error.message));
  }
};

module.exports.getAllNotes = async (event, context, cb) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    var params = {
      TableName: NOTES_TABLE_NAME
    };
    const allData = await documentClient.scan(params).promise();
    cb(null, send(200, allData));
  } catch (error) {
    cb(null, send(500, error.message));
  }
};
