import { useRouter } from "next/router";

const Main = () => {
  const router = useRouter();
  const onClickHandler = () => {
    router.push("/quizform");
  };
  return (
    <div className="h=screen bg-red-500">
      <button onClick={onClickHandler}>Create flashcard</button>
    </div>
  );
};

export default Main;
