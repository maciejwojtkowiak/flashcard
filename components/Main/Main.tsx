import Link from "next/link";
import { useRouter } from "next/router";

const Main = () => {
  const router = useRouter();

  return (
    <div className="h-screen grid  place-items-center">
      <Link href="/quizform">
        <button className="bg-green-500  px-12 py-8 text-white text-4xl font-bold">
          Create flashcard
        </button>
      </Link>
    </div>
  );
};

export default Main;
