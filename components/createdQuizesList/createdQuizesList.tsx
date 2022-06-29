import React from 'react';
import { FlashCard } from '../../shared/types';

interface createdQuizesProps {
  createdQuizes: FlashCard[];
}

const CreatedQuizesList = (props: createdQuizesProps) => {
  const listOfFlashcards = props.createdQuizes;
  console.log(listOfFlashcards);
  return (
    <div className="h-screen  grid place-items-center">
      <div className="h-[40rem] w-[30rem] drop-shadow-2xl shadow-2xl ">
        <h1>HEJO</h1>
        {listOfFlashcards.map((flashcard) => (
          <React.Fragment>
            <div>{flashcard.title}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CreatedQuizesList;
