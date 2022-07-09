import { Flashcard } from '../../shared/types';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface QuizProps {
  flashcard: Flashcard;
}

const QuizComponent = (props: QuizProps) => {
  const items = props.flashcard?.items;
  const MIN_INDEX = 0;
  const MAX_INDEX = items.length - 1;
  const widthOfBlock = (100 / items.length).toFixed(2).toString();
  const [actualIndex, setActualIndex] = useState<number>(0);
  const arrayOfProgressBlocks: React.ReactElement[] = [];
  const [isAtMinIndex, setIsAtMinIndex] = useState<boolean>(false);
  const [isAtMaxIndex, setIsAtMaxIndex] = useState<boolean>(false);
  const [definitionIsShown, setDefinitionIsShown] =
    useState<boolean>(false);

  const onClickDecrease = () => {
    setActualIndex((prevIndex) => --prevIndex);
  };

  const onClickIncrease = () => {
    setActualIndex((previndex) => ++previndex);
  };

  const onClickFlip = () => {
    setDefinitionIsShown((prev) => !prev);
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
      <motion.div
        onClick={onClickFlip}
        className="h-[20rem] w-1/4 grid place-items-center drop-shadow-2xl shadow-2xl text-blue-500 border-2"
      >
        <h1>{props.flashcard.title}</h1>
        <motion.h1 className="text-6xl" whileTap={{ rotateY: 100 }}>
          {!definitionIsShown
            ? items[actualIndex].word
            : items[actualIndex].definition}
        </motion.h1>
      </motion.div>

      <div className="grid place-items-center">
        <div>
          <button
            disabled={isAtMinIndex}
            onClick={onClickDecrease}
            className={`${isAtMinIndex ? 'text-gray-300' : ''}`}
          >
            <FaArrowLeft size={50} />
          </button>

          <button
            disabled={isAtMaxIndex}
            onClick={onClickIncrease}
            className={`${isAtMaxIndex ? 'text-gray-300' : ''}`}
          >
            <FaArrowRight size={50} />
          </button>
        </div>

        {isAtMaxIndex && (
          <Link href="/">
            <button className="absolute text-4xl mt-64 bg-green-400 py-4 px-6 rounded-xl text-white">
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
