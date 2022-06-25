import { FlashCard } from "../../shared/types";

interface createdQuizesProps {
  createdQuizes: FlashCard[];
}

const createdQuizesList = (props: createdQuizesProps) => {
  const listOfFlashcards = props.createdQuizes;
  return (
    <div>
      {listOfFlashcards.map((flashcard) => (
        <div>{flashcard.title}</div>
      ))}
    </div>
  );
};

export default createdQuizesList;
