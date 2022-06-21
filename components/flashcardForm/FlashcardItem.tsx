interface FlashCardItemProps {
  itemName: string;
}

const FlashcardItem: React.FC<FlashCardItemProps> = (props) => {
  return (
    <div className=" w-full border-2 border-color-red-500 break-words text-center">
      {props.itemName}
    </div>
  );
};

export default FlashcardItem;
