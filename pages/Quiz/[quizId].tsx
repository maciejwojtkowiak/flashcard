import { GetStaticPaths, GetStaticProps } from "next";
import { connectToMongo } from "../../helpers/connectToMongo";

const FlashcardQuiz = () => {
  return <div></div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const db = await connectToMongo();
  const flashcardsCollection = db.collection("flashcards");
  const correctedFlashcards = (
    await flashcardsCollection.find({}).toArray()
  ).map((flashCard) => {
    return {
      params: {
        ...flashCard,
        _id: flashCard._id.toString(),
      },
    };
  });
  console.log("corrected", correctedFlashcards);

  return {
    fallback: true,
    paths: [
      {
        params: {
          quizId: "123",
        },
      },
    ],
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const flashCardId = context.params?.quizId;
  return {
    props: {
      flashCardId: flashCardId,
    },
  };
};

export default FlashcardQuiz;
