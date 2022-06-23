import { useState } from "react";
import { FlashcardItemInterface } from "../../shared/types";

interface FlashCardItemProps {
  item: FlashcardItemInterface;
  updateItem: (item: FlashcardItemInterface) => void;
}

const FlashcardItem: React.FC<FlashCardItemProps> = (props) => {
  const [word, setWord] = useState<string>("");
  const [definition, setDefinition] = useState<string>("");
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
  return (
    <div className=" w-full border-2  break-words text-center">
      <input onChange={(e) => onChangeValueHandler(e, setWord)} value={word} />
      <input
        onChange={(e) => onChangeValueHandler(e, setDefinition)}
        value={definition}
      />
    </div>
  );
};

export default FlashcardItem;
