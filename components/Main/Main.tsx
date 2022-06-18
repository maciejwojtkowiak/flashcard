import { useRouter } from "next/router";

const Main = () => {
  const router = useRouter();
  const onClickHandler = () => {
    router.push("/quizform");
  };
  return (
    <div className="h-screen grid  place-items-center">
      <button
        onClick={onClickHandler}
        className="bg-green-500  px-12 py-8 text-white text-4xl font-bold"
      >
        Create flashcard
      </button>
    </div>
  );
};

export default Main;
