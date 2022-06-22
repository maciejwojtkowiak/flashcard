interface FlashCardItemProps {
  itemName: string;
}

const FlashcardItem: React.FC<FlashCardItemProps> = (props) => {
  return (
    <div className=" w-full border-2  break-words text-center">
      {props.itemName}
    </div>
  );
};

export default FlashcardItem;
