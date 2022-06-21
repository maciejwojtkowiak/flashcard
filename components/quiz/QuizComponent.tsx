import { FlashCard } from "../../shared/types";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
    <div className="h-screen w-full grid place-items-center">
      <div className="h-[20rem] w-1/4 drop-shadow-2xl shadow-2xl text-blue-500 border-2">
        <h1>{items[actualIndex]}</h1>
      </div>

      <div>
        {!isAtMinIndex && (
          <button onClick={onClickDecrease}>
            <FaArrowLeft />
          </button>
        )}
        {!isAtMaxIndex && (
          <button onClick={onClickIncrease}>
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
