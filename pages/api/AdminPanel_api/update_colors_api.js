//  api/register-account
import { MongoClient, ObjectID } from "mongodb";
import { db_credentials } from "../../../Values/api_credentials";
async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("updating color with " + db_credentials);
      const client = await MongoClient.connect(db_credentials);
      const db = client.db();
      const meta_data_collection = db.collection("meta_data_colors");
      console.log(req.body)
      const payload = {
        title: req.body.title,
        color:req.body.color,
        _id:req.body._id
      };
      console.log(payload)
      const result = await meta_data_collection.updateOne({"_id": ObjectID(payload._id)},{"$set":{title:payload.title,color:payload.color}},(error,response)=>{
        res.status(201).json({
            responseCode: 1,
            responseMessage: "Record Updated",
            responsePayload: response,
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
