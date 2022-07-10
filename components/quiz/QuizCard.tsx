import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FlashcardItemInterface } from '../../shared/types';

const animation = {
  flip: {
    rotateY: 180,
    transition: {
      duration: 0.5,
    },
  },
  notFlipped: {
    rotateY: 0,
    transition: {
      duration: 0.5,
    },
  },
};

interface CardProps {
  items: FlashcardItemInterface[];
  actualIndex: number;
}

const QuizCard = (props: CardProps) => {
  const [definitionIsShown, setDefinitionIsShown] =
    useState<boolean>(false);
  const [isTapped, setIsTapped] = useState<boolean>(false);
  const onClickFlip = () => {
    setDefinitionIsShown((prev) => !prev);
    setIsTapped(true);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsTapped(false);
    }, 500);

    return () => {};
  }, [isTapped]);

  return (
    <motion.div
      className="h-[20rem] w-1/4 grid place-items-center drop-shadow-2xl shadow-2xl text-blue-500 border-2 cursor-pointer "
      onClick={onClickFlip}
    >
      <motion.h1
        className="text-6xl"
        variants={animation}
        animate={isTapped ? 'flip' : 'notFlipped'}
      >
        {!definitionIsShown
          ? props.items[props.actualIndex].word
          : props.items[props.actualIndex].definition}
      </motion.h1>
    </motion.div>
  );
};

export default QuizCard;
