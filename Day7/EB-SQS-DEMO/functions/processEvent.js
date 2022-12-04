module.exports.handler = async (event) => {
  let records = event.Records;
  let batchItemFailures = [];

  if (records.length) {
    for (const record of records) {
      try {
        const parsedBody = JSON.parse(record.body);
        console.log("EVENT",parsedBody)
        if(typeof parsedBody.detail.vehicleNo !== 'string') {
          throw new Error("Vehicle Number Must be a String");
        }
        console.log("processing vechile details " + parsedBody.detail.vehicleNo);
        console.log("processing is successful " + record.messageId);
      } catch (err) {
        batchItemFailures.push({
          itemIdentifier: record.messageId,
        });
      }
    }
  }
  return { batchItemFailures };
};
