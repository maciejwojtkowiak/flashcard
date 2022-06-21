interface FlashCardItemProps {
  itemName: string;
}

const FlashcardItem: React.FC<FlashCardItemProps> = (props) => {
  return <div className="bg-red-500">{props.itemName}</div>;
};

export default FlashcardItem;
