import { MongoClient } from "mongodb";
import { db_credentials } from "../../../Values/api_credentials";
async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let records = [];
      const client = await MongoClient.connect(db_credentials);
      const db = client.db();
      const meta_data_collection = db
        .collection("meta_data_designs")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          result.forEach((item, index) => {
            records.push(item);
          });
          console.log("inside load all design api " + records);
          res.status(201).json({
            responseCode: 1,
            responseMessage: "Records loaded",
            responsePayload: records,
          });
        });
    } catch (err) {
      console.log(error);
      res.status(201).json({
        responseCode: 2,
        responseMessage: "Error",
        responsePayload: error,
      });
    }
  } else {
    res.status(500).json({
      responseCode: -1,
      responseMessage: "Fatal Error",
    });
    res.end();
  }
}
export default handler;
