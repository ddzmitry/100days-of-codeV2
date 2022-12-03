"use strict";
import { DynamoDB } from "aws-sdk";
import { APIGatewayEvent, Context, APIGatewayProxyCallback } from "aws-lambda";
import { StatusCode } from "aws-sdk/clients/apigateway";
var documentClient = new DynamoDB.DocumentClient({
  httpOptions: {
    timeout: 5000,
  },
  maxRetries: 3,
  region: "us-east-1",
});
const NOTES_TABLE_NAME = process.env.NOTES_TABLE_NAME;
const send = (statusCode, data) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(data),
  };
};

export const createNote = async (
  event: APIGatewayEvent,
  context: Context,
  cb: APIGatewayProxyCallback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let data = JSON.parse(event.body as string);
  try {
    var params = {
      TableName: NOTES_TABLE_NAME as string,
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

export const updateNote = async (
  event: APIGatewayEvent,
  context: Context,
  cb: APIGatewayProxyCallback
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let notesId = event.pathParameters?.id;
  let data = JSON.parse(event.body as string);

  try {
    var params = {
      TableName: NOTES_TABLE_NAME as string,
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

export const deleteNote = async (
  event: APIGatewayEvent,
  context: Context,
  cb: APIGatewayProxyCallback
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let notesId = event.pathParameters?.id;

  try {
    let params = {
      TableName: NOTES_TABLE_NAME as string,
      Key: {
        notesId,
      },
      ConditionExpression: "attribute_exists(notesId)",
    };
    await documentClient.delete(params).promise();
    cb(null, send(200, `Note ${notesId} Was deleted`));
  } catch (error) {
    cb(null, send(500, error.message));
  }
};

export const getAllNotes = async (
  event: APIGatewayEvent,
  context: Context,
  cb: APIGatewayProxyCallback
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    var params = {
      TableName: NOTES_TABLE_NAME as string,
    };
    const allData = await documentClient.scan(params).promise();
    cb(null, send(200, allData));
  } catch (error) {
    cb(null, send(500, error.message));
  }
};
