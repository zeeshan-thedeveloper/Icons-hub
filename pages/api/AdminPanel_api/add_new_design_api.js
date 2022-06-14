//  api/register-account
import { MongoClient } from "mongodb";
import { db_credentials } from "../../../Values/api_credentials";
async function handler(req, res) {
  if (req.method === "POST") {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    try {
      console.log("Adding new design with " + db_credentials);
      const client = await MongoClient.connect(db_credentials);
      const db = client.db();
      const meta_data_collection = db.collection("meta_data_designs");
      const payload = {
        designTitle: req.body.designTitle,
        designCanvaLink: req.body.designCanvaLink,
        designThumbnail: req.body.designThumbnail,
        designDescription: req.body.designDescription,
        attachedCatagories: req.body.attachedCatagories,
        attachedTags: req.body.attachedTags,
        attachedLanguages: req.body.attachedLanguages,
        downloadingHistory: [
          {
            downloadId: "0",
            userEmail: "sample@gmail.com",
            userName: "sample",
            userCountry: "sample",
            userWebsite: "sample.com",
          },
        ],
        uploadDate: today,
      };
      const result = await meta_data_collection.insertOne(payload);
      res.status(201).json({
        responseCode: 1,
        responseMessage: "Record added",
        responsePayload: result,
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
