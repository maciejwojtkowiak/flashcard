import React from 'react';
import { FlashCard } from '../../shared/types';

interface createdQuizesProps {
  createdQuizes: FlashCard[];
}

const CreatedQuizesList = (props: createdQuizesProps) => {
  const listOfFlashcards = props.createdQuizes;
  console.log(listOfFlashcards);
  console.log('hi');
  return (
    <div>
      <h1>HEJO</h1>
      {listOfFlashcards.map((flashcard) => (
        <React.Fragment>
          <div>{flashcard.title}</div>
          <div>{flashcard.id}</div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CreatedQuizesList;
