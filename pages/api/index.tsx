import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await MongoClient.connect(
    "mongodb+srv://maciej:me1wS1lDx3F6En8T@cluster0.vv1w4.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
};

export default handler;
