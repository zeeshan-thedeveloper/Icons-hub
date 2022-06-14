import { MongoClient } from "mongodb";
import { db_credentials } from "../../../Values/api_credentials";
const Bcrypt = require("bcryptjs");

async function handler(req, res) {
  if (req.method === "POST") {
    // to add data on which user is registered
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    try {
      const client = await MongoClient.connect(db_credentials);
      const db = client.db();
      const meta_data_collection = db
        .collection("meta_data_users")
        .find({ email: req.body.email })
        .toArray(function (error, result) {
          if (error) throw error;
          if (result.length == 0) {
            // no user exists with same email
            const payload = {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: Bcrypt.hashSync(req.body.password, 10),
              websiteLink: req.body.websiteLink,
              country: req.body.country,
              registeredDate: today,
              dowloadedDesigns: [],
              dowloadedIllustrations: [],
              isTermsAndServiceAccepted: req.body.termsAndServicesAccepted,
              userAccountStatus: "Active"
            };

            const result = db.collection("meta_data_users").insertOne(payload);
            res.status(201).json({
              responseCode: 1,
              responseMessage: "User added",
              responsePayload: result
            });
          } else {
            // email already used by another user
            res.status(201).json({
              responseCode: 3,
              responseMessage: "User exists with Same Email",
              responsePayload: null
            });
          }
        });
    } catch (error) {
      console.log(error);
      console.log(error);
      res.status(400).json({
        responseCode: 2,
        responseMessage: "Error",
        responsePayload: error
      });
    }
  } else {
    res.status(500).json({
      responseCode: -1,
      responseMessage: "Fatal Error"
    });
    res.end();
  }
}
export default handler;
