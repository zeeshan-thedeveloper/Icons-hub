import { MongoClient } from "mongodb";
import { db_credentials } from "../../../Values/api_credentials";
async function handler(req, res) {
  console.log("loading new designs");
  if (req.method === "POST") {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    try {
      let records = [];
      const client = await MongoClient.connect(db_credentials);
      const db = client.db();
      const meta_data_collection = db
        .collection("meta_data_designs")
        .find({})
        .sort({ _id: -1 })
        .limit(10)
        .toArray(function (err, result) {
          if (err) throw err;
          result.forEach((item, index) => {
            records.push(item);
          });

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
