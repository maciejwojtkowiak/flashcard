import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlashCard } from "../../shared/types";
import { listAction } from "../../src/store/list-slice";
import { RootState } from "../../src/store/store";

const FlashCardForm = () => {
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

  console.log(itemsList);
  console.log(itemName);

  return (
    <div className="h-screen bg-red-500 grid place-items-center">
      <div className="h-[40rem] w-[30rem] bg-white flex">
        {itemsList.map((itemList) => (
          <div>{itemList}</div>
        ))}
        <form className="h-[10%] w-full self-end">
          <input onChange={onChangeHandler} className="w-full" />
          <button onClick={onAddHandler}>Add</button>
        </form>
        <button onClick={onClickHandler}>Start</button>
      </div>
    </div>
  );
};

export default FlashCardForm;
