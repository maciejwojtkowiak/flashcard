import { MongoClient } from 'mongodb';

export const closeMongo = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://maciejtest:ipT4zxXWbIF4sCqG@cluster0.vv1w4.mongodb.net/flashcard?retryWrites=true&w=majority'
  );

  return client.close();
};
