import { FlashCard } from "../../shared/types";
import { useState, useEffect } from "react";

interface QuizProps {
  flashcard: FlashCard;
}

const QuizComponent: React.FC<QuizProps> = (props) => {
  const items = props.flashcard.items;
  const MIN_INDEX = 0;
  const MAX_INDEX = items.length - 1;
  const [actualIndex, setActualIndex] = useState<number>(0);
  const [isAtMinIndex, setIsAtMinIndex] = useState<boolean>(false);
  const [isAtMaxIndex, setIsAtMaxIndex] = useState<boolean>(false);

  const onClickDecrease = () => {
    setActualIndex((prevIndex) => --prevIndex);
  };

  const onClickIncrease = () => {
    setActualIndex((previndex) => ++previndex);
  };

  useEffect(() => {
    if (actualIndex === MIN_INDEX) setIsAtMinIndex(true);
    else setIsAtMinIndex(false);
    if (actualIndex === MAX_INDEX) setIsAtMaxIndex(true);
    else setIsAtMaxIndex(false);
  }, [actualIndex]);
  return (
    <div>
      <h1>{items[actualIndex]}</h1>
      {!isAtMinIndex && <button onClick={() => onClickDecrease()}>-</button>}
      {!isAtMaxIndex && <button onClick={() => onClickIncrease()}>+</button>}
    </div>
  );
};

export default QuizComponent;
