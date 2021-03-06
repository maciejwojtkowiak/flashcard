import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const item = req.body;
    const client = await MongoClient.connect(
      'mongodb+srv://maciejtest:ipT4zxXWbIF4sCqG@cluster0.vv1w4.mongodb.net/flashcard?retryWrites=true&w=majority'
    );
    const db = client.db();
    const itemToInsert = {
      _id: new ObjectId(Math.random()),
      ...item,
    };

    const itemCollection = db.collection('flashcards');
    await itemCollection.insertOne(itemToInsert);
  }
};

export default handler;
