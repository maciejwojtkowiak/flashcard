import { connect } from "http2";
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
        quizId: flashCard._id.toString(),
      },
    };
  });
  console.log("corrected", correctedFlashcards);

  return {
    fallback: true,
    paths: correctedFlashcards,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const flashCardId = context.params?.quizId;
  console.log("flashCardId", flashCardId);
  const db = await connectToMongo();
  const flashcardsCollection = db.collection("flashcards");
  const correctedFlashcard = (
    await flashcardsCollection.find({}).toArray()
  ).map((flashcard) => {
    return {
      ...flashcard,
      _id: flashcard._id.toString(),
    };
  });

  const foundFlashcard = correctedFlashcard.find(
    (flashcard) => flashcard._id === flashCardId
  );

  console.log("corrected", foundFlashcard);
  return {
    props: {
      flashCardId: flashCardId,
    },
  };
};

export default FlashcardQuiz;
