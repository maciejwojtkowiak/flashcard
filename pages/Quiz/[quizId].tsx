import { ObjectId } from "mongodb";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { connectToMongo } from "../../helpers/connectToMongo";

const FlashcardQuiz = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  console.log(props.flashcard);
  return (
    <div>
      {props.flashcard.flashcard.items.map((item: string) => (
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
    return {
      params: {
        quizId: flashcard.flashcard.id,
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

  console.log("corrected,", correctedFlashcard);

  const foundFlashcard = correctedFlashcard.find(
    (flashcard) => flashcard._id === flashCardId
  );

  console.log("found", foundFlashcard);
  return {
    props: {
      flashcard: foundFlashcard,
    },
  };
};

export default FlashcardQuiz;
