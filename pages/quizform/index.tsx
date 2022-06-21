import { NextPage } from "next";
import React from "react";
import FlashcardForm from "../../../flashcard/components/flashcardForm/FlashcardForm";
import Main from "../../components/main/Main";

const QuizForm: NextPage = () => {
  return (
    <React.Fragment>
      <FlashcardForm />
    </React.Fragment>
  );
};

export default QuizForm;
