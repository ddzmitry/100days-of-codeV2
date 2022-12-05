const AWS = require("aws-sdk");
const StepFunction = new AWS.StepFunctions();
const DynamoDB = require("aws-sdk/clients/dynamodb");
const DocumentClient = new DynamoDB.DocumentClient({ region: "us-east-1" });

const isBookAvailable = (book, quantity) => {
  return book.quantity - quantity > 0;
};

const deductPoints = async (userid) => {
  let params = {
    TableName: "userTable",
    Key: { userid: userid },
    UpdateExpression: "set points = :zero",
    ExpressionAttributeValues: {
      ":zero": 0,
    },
  };
  // redeem points

  await DocumentClient.update(params).promise();
};

module.exports.checkInventory = async ({ bookid, quantity }) => {
  try {
    let params = {
      TableName: "bookTable",
      KeyConditionExpression: "bookid = :bookid",
      ExpressionAttributeValues: {
        ":bookid": bookid,
      },
    };
    let result = await DocumentClient.query(params).promise();
    let book = result.Items[0];

    if (isBookAvailable(book, quantity)) {
      return book;
    } else {
      let bookOutOfStockError = new Error("The book is out of stock");
      bookOutOfStockError.name = "BookOutOfStock";
      throw bookOutOfStockError;
    }
  } catch (e) {
    if (e.name === "BookOutOfStock") {
      throw e;
    } else {
      let bookNotFoundError = new Error(e);
      bookNotFoundError.name = "BookNotFound";
      throw bookNotFoundError;
    }
  }
};

module.exports.calculateTotal = async ({ book, quantity }) => {
  console.log("book: ", book);
  console.log("quantity: ", book);
  let total = book.price * quantity;
  return { total };
};

module.exports.redeemPoints = async () => {
  // { userid, total }
  const userid = '1'
  const total = { 'total': 100000}
  console.log("{ userid, total }",{ userid, total })
  let orderTotal = total.total;
  try {
    let params = {
      TableName: 'userTable',
      Key: {
          'userid': userid
      }
  };

    // Get user
    let result = await DocumentClient.get(params).promise();
    let user = result.Item;
    console.log("user: ", user);
    const points = user.points;
    console.log("orderTotal",orderTotal)
    console.log("points: ", points);
    console.log("orderTotal > points",orderTotal > points)
    if (orderTotal > points) {
      await deductPoints(userid);
      orderTotal = orderTotal - points;
      return { total: orderTotal, points };
    } else {
      throw new Error("Order total is less than redeem points");
    }
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
};

module.exports.billCustomer = async (params) => {
  console.log(params);
  // throw 'Error in billing'
  /* Bill the customer e.g. Using Stripe token from the paramerters */
  return "Successfully Billed"
}


module.exports.restoreRedeemPoints = async ({ userid, total }) => {
  try {
      if (total.points) {
          let params = {
              TableName: 'userTable',
              Key: { userid: userid },
              UpdateExpression: 'set points = :points',
              ExpressionAttributeValues: {
                  ':points': total.points
              }
          };
          await DocumentClient.update(params).promise();
      }
  } catch (e) {
      throw new Error(e);
  }
}