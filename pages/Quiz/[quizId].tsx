import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { connectToMongo } from "../../helpers/connectToMongo";
import { FlashCard } from "../../shared/types";
import { useEffect, useState } from "react";

const FlashcardQuiz = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const items = props.flashcard.items;
  const MIN_INDEX = 0;
  const MAX_INDEX = items.length - 1;
  const [actualIndex, setActualIndex] = useState<number>(0);
  const [isAtMinIndex, setIsAtMinIndex] = useState<boolean>(false);
  const [isAtMaxIndex, setIsAtMaxIndex] = useState<boolean>(false);

  useEffect(() => {
    if (actualIndex === MIN_INDEX) setIsAtMinIndex(true);
    else setIsAtMinIndex(false);
    if (actualIndex === MAX_INDEX) setIsAtMaxIndex(true);
    else setIsAtMaxIndex(false);
  }, [actualIndex]);

  return (
    <div>
      <h1>{items[actualIndex]}</h1>
      {!isAtMinIndex && (
        <button onClick={() => setActualIndex((prevIndex) => --prevIndex)}>
          -
        </button>
      )}
      {!isAtMaxIndex && (
        <button onClick={() => setActualIndex((prevIndex) => ++prevIndex)}>
          +
        </button>
      )}
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
