import { MongoClient } from "mongodb";
import { db_credentials } from "../../../Values/api_credentials";
async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const client = await MongoClient.connect(db_credentials);
      const db = client.db();
      const meta_data_collection = db.collection("meta_data_users");
      const result = await meta_data_collection.updateOne(
        { email: req.body.email },
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            websiteLink: req.body.websiteLink,
            country: req.body.country,
          },
        },
        (error, response) => {
          if (error) throw error;
          const get_data = db
            .collection("meta_data_users")
            .find({ email: req.body.email })
            .toArray(function (err, result) {
              if (err) throw err;
              let records = [];
              result.forEach((item, index) => {
                records.push(item);
              });

              res.status(201).json({
                responseCode: 1,
                responseMessage: "Updated Successfully",
                responsePayload: records[0],
              });
            });
        }
      );
    } catch (err) {
      console.log(err);
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
