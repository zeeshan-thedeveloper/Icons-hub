//  api/register-account
import {MongoClient} from 'mongodb'
async function handler(req,res){
    if(req.method==='POST'){
        console.log("In post method to register")
        // const data = req.body;
        // // const {fullName,phone,email,password}=data;
        // const client =await MongoClient.connect('mongodb+srv://zee:rnIe4OraZ6x8RQxL@cluster0.q2o4w.mongodb.net/nzn_devopts_db?retryWrites=true&w=majority')
        // const db = client.db();
        // const nzn_devopts_db_users = db.collection('users');
        // const result = await nzn_devopts_db_users.insertOne(data)
        // console.log("User added in mongo db ");
        // console.log(result);
        // res.status(201).json({
        //     responseMessage:"Record added",
        //     responsePayload:result

        // })
    }
    else
    {
    res.status(500)
    res.end()
    }
}

export default handler;