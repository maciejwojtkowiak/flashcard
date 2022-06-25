import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { connectToMongo } from "../../helpers/connectToMongo";
import CreatedQuizesList from "../../components/createdQuizesList/createdQuizesList";

const CreatedQuizes: NextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  return <CreatedQuizesList createdQuizes={props.flashcards} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const db = await connectToMongo();
  const flashCardsCollection = db.collection("flashcard");
  const flashcards = (await flashCardsCollection.find({}).toArray()).map(
    (flashcard) => {
      return {
        ...flashcard,
        _id: flashcard._id.toString(),
      };
    }
  );
  return {
    props: {
      flashcards,
    },
  };
};
export default CreatedQuizes;
