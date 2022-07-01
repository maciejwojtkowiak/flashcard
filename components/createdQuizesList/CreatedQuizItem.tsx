interface CreatedQuizItemProps {
  title: string;
}

const CreatedQuizItem = (props: CreatedQuizItemProps) => {
  return (
    <div className="grid w-full  ">
      <div className="text-center border-2 py-4">{props.title}</div>
    </div>
  );
};

export default CreatedQuizItem;
