//  api/register-account
import produce from "immer";
import { MongoClient } from "mongodb";
import { db_credentials } from "../../../Values/api_credentials";
async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("Loading all colors ");
      const client = await MongoClient.connect(db_credentials);
      const db = client.db("icon_engine_db");
      const meta_data_collection = db.collection("meta_data_colors");
      let records = [];
      const temp = await db
        .collection("meta_data_colors")
        .find({})
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
    } catch (error) {
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
