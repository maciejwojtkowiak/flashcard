import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { connectToMongo } from '../../helpers/connectToMongo';
import { Flashcard } from '../../shared/types';
import QuizComponent from '../../components/Quiz/QuizComponent';
import { closeMongo } from '../../helpers/closeMongo';

const FlashcardQuiz = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  return <QuizComponent flashcard={props.flashcard} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const db = await connectToMongo();
  const flashcardsCollection = db.collection('flashcards');
  const correctedFlashcards = (
    await flashcardsCollection.find({}).toArray()
  ).map((flashcard) => {
    return {
      params: {
        quizId: flashcard.id,
      },
    };
  });

  console.log('corrected', flashcardsCollection);

  return {
    fallback: 'blocking',
    paths: correctedFlashcards,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const flashCardId = context.params?.quizId;

  const db = await connectToMongo();
  const flashcardsCollection = db.collection('flashcards');
  const correctedFlashcard = (
    await flashcardsCollection.find({}).toArray()
  ).map((flashcard) => {
    return {
      ...flashcard,
      _id: flashcard._id!.toString(),
    };
  }) as Flashcard[];

  const foundFlashcard = correctedFlashcard.find(
    (flashcard) => flashcard.id === flashCardId
  );
  closeMongo();

  return {
    props: {
      flashcard: foundFlashcard,
    },
  };
};

export default FlashcardQuiz;
