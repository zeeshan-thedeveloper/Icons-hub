//  api/register-account
import { MongoClient } from "mongodb";
import { db_credentials } from "../../../Values/api_credentials";
const Bcrypt = require("bcryptjs");

async function handler(req, res) {
  if (req.method === "POST") {
   
    try {
      console.log("Authenticating admin with " + db_credentials);
      const client = await MongoClient.connect(db_credentials);
      const db = client.db();
      const meta_data_collection = db.collection("admin_credentials");
      const payload = {
        email: req.body.email,
        password: req.body.password
      };


      const result = await meta_data_collection.findOne({admin_email:payload.email});
      if(result!=null){
        if(!Bcrypt.compareSync(payload.password, result.admin_password)) {
          res.status(201).json({
            responseCode: 2,
            responseMessage: "Wrong email or password",
            responsePayload: result,
          });
          
        }else{
          res.status(201).json({
            responseCode: 1,
            responseMessage: "Login Sucessfull",
            responsePayload: result,
          });
        }
          
      }else{
        res.status(201).json({
            responseCode: 2,
            responseMessage: "Wrong email or password",
            responsePayload: result,
          });
      }

      let encryptedPassword =  Bcrypt.hashSync(payload.password, 10);
      
      console.log(encryptedPassword);
      console.log(result);

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
