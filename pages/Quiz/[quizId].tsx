import { GetStaticPaths, GetStaticProps } from "next";
import { connectToMongo } from "../../helpers/connectToMongo";

const FlashcardQuiz = () => {
  return <div></div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const db = await connectToMongo();

  return {
    fallback: "blocking",
    paths: [
      {
        params: {
          quizId: "2",
        },
      },
    ],
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const flashCardId = context.params?.quizId;
  return {
    props: {
      flashCardId: flashCardId,
    },
  };
};

export default FlashcardQuiz;
