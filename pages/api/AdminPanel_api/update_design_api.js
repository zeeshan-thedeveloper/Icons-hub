//  api/register-account
import { MongoClient, ObjectID } from "mongodb";
import { db_credentials } from "../../../Values/api_credentials";
async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("updating design with " + db_credentials);
      const client = await MongoClient.connect(db_credentials);
      const db = client.db();
      const meta_data_collection = db.collection("meta_data_designs");
      const payload = {
        _id:req.body._id,  
        designTitle: req.body.designTitle,
        designCanvaLink : req.body.designCanvaLink,
        designThumbnail: req.body.designThumbnail,
        designDescription: req.body.designDescription,
        attachedCatagories:req.body.attachedCatagories,
        attachedTags:req.body.attachedTags,
        attachedLanguages:req.body.attachedLanguages,
        downloadingHistory:[],
      };

      const result = await meta_data_collection.updateOne({"_id": ObjectID(payload._id)},{"$set":{  
        designTitle: payload.designTitle,
        designCanvaLink : payload.designCanvaLink,
        designThumbnail: payload.designThumbnail,
        designDescription: payload.designDescription,
        attachedCatagories:payload.attachedCatagories,
        attachedTags:payload.attachedTags,
        attachedLanguages:payload.attachedLanguages,
      }},(error,response)=>{
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
