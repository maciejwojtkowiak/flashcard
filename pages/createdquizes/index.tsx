import {
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { connectToMongo } from '../../helpers/connectToMongo';
import CreatedQuizesList from '../../components/CreatedQuizesList/CreatedQuizesList';
import { closeMongo } from '../../helpers/closeMongo';

const CreatedQuizes: NextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  return <CreatedQuizesList createdQuizes={props.flashcards} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const db = await connectToMongo();
  const flashCardsCollection = db.collection('flashcards');
  const flashcards = (
    await flashCardsCollection.find({}).toArray()
  ).map((flashcard) => {
    return {
      ...flashcard,
      _id: flashcard._id.toString(),
    };
  });
  closeMongo();

  return {
    props: {
      flashcards,
    },
  };
};
export default CreatedQuizes;
