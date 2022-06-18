import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const item = req.body;
    console.log(item);
    const client = await MongoClient.connect(
      "mongodb+srv://maciejtest:ipT4zxXWbIF4sCqG@cluster0.vv1w4.mongodb.net/flashcard?retryWrites=true&w=majority"
    );
    const db = client.db();

    const itemCollection = db.collection("items");
    console.log("collect", itemCollection);
    await itemCollection.insertOne(item);
  }
};

export default handler;
