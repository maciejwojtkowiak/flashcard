import Link from "next/link";

const Main = () => {
  return (
    <div className="h-screen grid  content-center justify-center gap-16">
      <Link href="/quizform">
        <button className="bg-green-500  px-12 py-8 text-white text-4xl font-bold w-[30rem]">
          Create flashcard
        </button>
      </Link>
      <Link href="/createdquizes">
        <button className="bg-blue-500 px-12 py-8 text-white text-3xl font-bold w-[30rem]">
          Flashcards created by users
        </button>
      </Link>
    </div>
  );
};

export default Main;
