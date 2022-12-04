"use strict";
const EventBridge = require("aws-sdk/clients/eventbridge");

let eventBridge = new EventBridge();

module.exports.handler = async (event, context) => {
  // Get Data
  const data = JSON.parse(event.body);
  // Process Data
  data[`IS_PROCESSED`] = true;
  // Send data to event Bridge
  let eventBusEvent = {
    EventBusName: process.env.EVENT_BUS_NAME,
    Detail: JSON.stringify({
      vehicleNo: data.vehicleNo,
      NIC: data.NIC,
    }),
    Source: "fuel-app",
    DetailType: "user-signup",
    Time: new Date(),
    TraceHeader: context.functionName,
  };

  try {
    let output = await eventBridge.putEvents({ Entries: [eventBusEvent] }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(output),
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};
