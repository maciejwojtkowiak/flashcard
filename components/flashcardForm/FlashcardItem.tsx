import { useState } from 'react';
import { FlashcardItemInterface } from '../../shared/types';

interface FlashCardItemProps {
  item: FlashcardItemInterface;
  updateItem: (item: FlashcardItemInterface) => void;
  deleteItem: (item: FlashcardItemInterface) => void;
}

const FlashcardItem = (props: FlashCardItemProps) => {
  const [word, setWord] = useState<string>('');
  const [definition, setDefinition] = useState<string>('');
  const onChangeValueHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: (value: string) => void
  ) => {
    setValue(e.target.value);
    const item = {
      ...props.item,
      word: word,
      definition: definition,
    };
    props.updateItem(item);
  };

  const onClickHandler = () => {
    props.deleteItem(props.item);
  };
  return (
    <div className=" w-full flex gap-4 justify-center break-words text-center ">
      <div className="my-6">
        <input
          className="border-b-2 border-green-400 bg-gray-200 py-2 px-1 focus:outline-none mr-2"
          placeholder="word"
          onChange={(e) => onChangeValueHandler(e, setWord)}
          value={word}
        />
        <input
          className="border-b-2 border-green-400 bg-gray-200 py-2 px-1 focus:outline-none"
          placeholder="definition"
          onChange={(e) => onChangeValueHandler(e, setDefinition)}
          value={definition}
        />
      </div>
      <div className="grid place-items-center">
        <button
          onClick={onClickHandler}
          className="bg-red-500 px-2 rounded-md text-white"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default FlashcardItem;
