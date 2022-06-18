import { MongoClient } from "mongodb";

export const connectToMongo = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://maciejtest:ipT4zxXWbIF4sCqG@cluster0.vv1w4.mongodb.net/flashcard?retryWrites=true&w=majority"
  );
  const db = client.db();
  return db;
};
