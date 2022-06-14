import { MongoClient, ObjectId } from "mongodb";
import { db_credentials } from "../../../Values/api_credentials";
async function handler(req, res) {
  if (req.method === "POST") {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    try {
      console.log("-------------------");
      console.log(req.body.illustrationId);
      const client = await MongoClient.connect(db_credentials);
      const db = client.db();
      let previousHistroy = [];
      const meta_data_collection = db
        .collection("meta_data_users")
        .find({ email: req.body.email })
        .toArray(function (error, result) {
          if (error) throw error;
          else {
            if (result.length == 0) {
              // incorrect email received
              console.log("user not found");
            } else {
              // add dowloaded record
              previousHistroy = result[0].dowloadedIllustrations;
              let payload = {
                dowloadedIllustrationId: previousHistroy.length + 1,
                illstrationTitle: req.body.illstrationTitle,
                illustrationThumbnail: req.body.illustrationThumbnail,
                illustrationDescription: req.body.illustrationDescription,
                originalIllustration: req.body.OriginalIllustration,
                downloadDate: today
              };
              previousHistroy.push(payload);
              // add record in users collection
              const meta_collection = db.collection("meta_data_users");
              const resultsOfUpdate = meta_collection.updateOne(
                { email: req.body.email },
                {
                  $set: {
                    dowloadedIllustrations: previousHistroy
                  }
                },
                (error, response) => {
                  if (error) throw error;

                  // now add record in illustrations collection

                  const current_Illustration = db
                    .collection("meta_data_illustrations")
                    .find({ _id: ObjectId(req.body.illustrationId) })
                    .toArray(function (error, result) {
                      if (result.length != 0) {
                        console.log(result[0]);
                        let illustrationPayload = {
                          dowloadId: result[0].downloadingHistory.length + 1,
                          userEmail: req.body.email,
                          userName: req.body.name,
                          userCountry: req.body.country,
                          userWebsite: req.body.websiteLink,
                          downloadDate: today
                        };
                        result[0].downloadingHistory.push(illustrationPayload);
                        const updateIllustration = db
                          .collection("meta_data_illustrations")
                          .updateOne(
                            { _id: ObjectId(req.body.illustrationId) },
                            {
                              $set: {
                                downloadingHistory: result[0].downloadingHistory
                              }
                            },
                            (error, response) => {
                              res.status(201).json({
                                responseCode: 1,
                                responseMessage: "Record Updated",
                                responsePayload: response
                              });
                            }
                          );
                      }
                    });
                }
              );
            }
          }
        });
    } catch (err) {
      console.log(err);
      res.status(201).json({
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
