import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { connectToMongo } from "../../helpers/connectToMongo";
import { FlashCard } from "../../shared/types";
import QuizComponent from "../../components/quiz/QuizComponent";

const FlashcardQuiz = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  return <QuizComponent flashcard={props.flashcard} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const db = await connectToMongo();
  const flashcardsCollection = db.collection("flashcards");
  const correctedFlashcards = (
    await flashcardsCollection.find({}).toArray()
  ).map((flashcard) => {
    return {
      params: {
        quizId: flashcard.id,
      },
    };
  });

  return {
    fallback: "blocking",
    paths: correctedFlashcards,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const flashCardId = context.params?.quizId;

  const db = await connectToMongo();
  const flashcardsCollection = db.collection("flashcards");
  const correctedFlashcard = (
    await flashcardsCollection.find({}).toArray()
  ).map((flashcard) => {
    return {
      items: flashcard.items,
      id: flashcard.id,
      _id: flashcard._id!.toString(),
    };
  }) as FlashCard[];

  const foundFlashcard = correctedFlashcard.find(
    (flashcard) => flashcard.id === flashCardId
  );

  return {
    props: {
      flashcard: foundFlashcard,
    },
  };
};

export default FlashcardQuiz;
