import {
  Flashcard,
  FlashcardItemInterface,
} from '../../shared/types';
import React, { useState, useEffect } from 'react';
import {
  IoMdArrowDropleft,
  IoMdArrowDropright,
} from 'react-icons/io';
import Link from 'next/link';
import QuizCard from './QuizCard';

interface QuizProps {
  flashcard: Flashcard;
}

const QuizComponent = (props: QuizProps) => {
  const items = props.flashcard?.items as FlashcardItemInterface[];
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
      <h1 className="text-6xl font-bold text-blue-500 ">
        {props.flashcard.title}
      </h1>
      <div className="flex w-full justify-center">
        <button
          disabled={isAtMinIndex}
          onClick={onClickDecrease}
          className={`${isAtMinIndex ? 'text-gray-300' : ''} mr-12`}
        >
          <IoMdArrowDropleft size={50} />
        </button>
        <QuizCard items={items} actualIndex={actualIndex} />
        <button
          disabled={isAtMaxIndex}
          onClick={onClickIncrease}
          className={`${isAtMaxIndex ? 'text-gray-300' : ''} ml-12`}
        >
          <IoMdArrowDropright size={50} />
        </button>
      </div>

      <div className="grid place-items-center">
        {isAtMaxIndex && (
          <Link href="/">
            <button className="absolute text-4xl  bg-blue-400 py-4 px-6 rounded-xl text-white">
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
