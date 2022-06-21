import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FlashCard } from "../../shared/types";
import { listAction } from "../../src/store/list-slice";
import FlashcardItem from "./FlashcardItem";

const FlashcardForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [itemName, setItemName] = useState<string>("");
  const [itemsList, setItemsList] = useState<string[]>([]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };
  const sendFlashcard = async (flashcard: FlashCard) => {
    fetch("/api/", {
      method: "POST",
      body: JSON.stringify({ id: flashcard.id, items: flashcard.items }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const onAddHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItemsList((prevList) => prevList.concat(itemName));
  };

  const onClickHandler = () => {
    const flashCard = {
      id: Math.random().toString(),
      items: itemsList,
    };
    dispatch(listAction.addFlashCardToList(flashCard));
    sendFlashcard(flashCard);
    router.push("/quiz/" + flashCard.id);
  };

  return (
    <div className="h-screen bg-red-500 grid place-items-center">
      <div className="h-[40rem] w-[30rem] bg-white ">
        <div className=" h-[35rem] bg-yellow-500 overflow-auto">
          {itemsList.map((item) => (
            <FlashcardItem itemName={item} />
          ))}
        </div>
        <form className=" self-end bg-green-500 h-[5rem] ">
          <input onChange={onChangeHandler} className="w-full bg-purple-500" />
          <button onClick={onAddHandler}>Add</button>
          <button className="bg-blue-500" onClick={onClickHandler}>
            Start
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlashcardForm;
