import React from 'react';
import { Flashcard } from '../../shared/types';
import CreatedQuizItem from './CreatedQuizItem';

interface createdQuizesProps {
  createdQuizes: Flashcard[];
}

const CreatedQuizesList = (props: createdQuizesProps) => {
  const listOfFlashcards = props.createdQuizes;
  return (
    <div className="h-screen  grid place-items-center">
      <div className="h-[40rem] w-[30rem] drop-shadow-2xl shadow-2xl  overflow-auto ">
        {listOfFlashcards.map((flashcard) => (
          <React.Fragment>
            <CreatedQuizItem flashcard={flashcard} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CreatedQuizesList;
