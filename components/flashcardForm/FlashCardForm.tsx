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
    setItemName("");
  };

  // dodaj do bazy i połącz się z bazą dodaj getServerSideProps
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
    <div className="h-screen  grid place-items-center ">
      <div className="h-[40rem] w-[30rem] drop-shadow-2xl shadow-2xl ">
        <div className=" h-[35rem] w-full ">
          {itemsList.map((item) => (
            <FlashcardItem itemName={item} />
          ))}
        </div>
        <div className="grid grid-rows-2 h-[5rem]">
          <form className=" self-end  ">
            <input
              value={itemName}
              onChange={onChangeHandler}
              className="w-full  focus:outline-none"
            />
            <button
              className="w-full text-green-500 font-bold"
              onClick={onAddHandler}
            >
              Add
            </button>
          </form>
          <button
            className="text-blue-500 font-bold w-full "
            onClick={onClickHandler}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardForm;
