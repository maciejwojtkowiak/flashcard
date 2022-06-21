interface FlashCardItemProps {
  itemName: string;
}

const FlashcardItem: React.FC<FlashCardItemProps> = (props) => {
  return (
    <div className="border-2 border-color-red-500 break-words">
      {props.itemName}
    </div>
  );
};

export default FlashcardItem;
