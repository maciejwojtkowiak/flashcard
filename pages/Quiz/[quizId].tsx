import { GetStaticPaths } from "next";
import { connectToMongo } from "../../helpers/connectToMongo";

const FlashcardQuiz = () => {
  return <div></div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: [
      {
        params: {
          quizId: "2",
        },
      },
    ],
  };
};

export default FlashcardQuiz;
