import { FlashCard } from "../../shared/types";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

interface QuizProps {
  flashcard: FlashCard;
}

const QuizComponent: React.FC<QuizProps> = (props) => {
  const items = props.flashcard?.items;
  const MIN_INDEX = 0;
  const MAX_INDEX = items.length - 1;
  const widthOfBlock = (100 / items.length).toFixed(2).toString();
  const [actualIndex, setActualIndex] = useState<number>(0);
  const arrayOfProgressBlocks: React.ReactElement[] = [];
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

  for (let i = 0; i <= actualIndex; i++) {
    arrayOfProgressBlocks.push(
      <div
        key={i}
        className={`border-2 border-blue-500 `}
        style={{ width: `${widthOfBlock}%` }}
      />
    );
  }

  return (
    <div className="h-screen w-full grid place-items-center">
      <div className="h-[20rem] w-1/4 grid place-items-center drop-shadow-2xl shadow-2xl text-blue-500 border-2">
        <h1 className="text-6xl">{items[actualIndex].word}</h1>
        <h1 className="text-6xl">{items[actualIndex].definition}</h1>
      </div>

      <div>
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

        {isAtMaxIndex && (
          <Link href="/">
            <button className="absolute text-4xl translate-x-[-50%] mt-16">
              Finish!
            </button>
          </Link>
        )}
      </div>
      <div className=" w-screen place-self-end flex gap-2">
        {arrayOfProgressBlocks}
      </div>
    </div>
  );
};

export default QuizComponent;
