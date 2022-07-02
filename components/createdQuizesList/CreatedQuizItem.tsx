import Link from 'next/link';
import { Flashcard } from '../../shared/types';

interface CreatedQuizItemProps {
  flashcard: Flashcard;
}

const CreatedQuizItem = (props: CreatedQuizItemProps) => {
  return (
    <div className="grid w-full  ">
      <Link href={'/quiz/' + props.flashcard.id}>
        <div className="text-center border-2 py-4 cursor-pointer">
          {props.flashcard.title}
        </div>
      </Link>
    </div>
  );
};

export default CreatedQuizItem;
