import { ObjectId } from "mongodb";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { connectToMongo } from "../../helpers/connectToMongo";
import { FlashCard } from "../../shared/types";

const FlashcardQuiz = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  return (
    <div>
      {props.flashcard.items.map((item: string) => (
        <h1>{item}</h1>
      ))}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const db = await connectToMongo();
  const flashcardsCollection = db.collection("flashcards");
  const correctedFlashcards = (
    await flashcardsCollection.find({}).toArray()
  ).map((flashcard) => {
    console.log("mapped flash", flashcard);
    return {
      params: {
        quizId: flashcard.id,
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
      items: flashcard.items,
      id: flashcard.id,
      _id: flashcard._id!.toString(),
    };
  }) as FlashCard[];

  console.log("correctedFetched,", correctedFlashcard);

  const foundFlashcard = correctedFlashcard.find(
    (flashcard) => flashcard.id === flashCardId
  );

  console.log("found", foundFlashcard);
  return {
    props: {
      flashcard: foundFlashcard,
    },
  };
};

export default FlashcardQuiz;
