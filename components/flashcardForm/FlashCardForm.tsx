import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAction } from "../../src/store/list-slice";
import { RootState } from "../../src/store/store";

const FlashCardForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [itemName, setItemName] = useState<string>("");
  const [itemsList, setItemsList] = useState<string[]>([]);
  const flashCards = useSelector(
    (state: RootState) => state.listSlice.listOfFlashCards
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };
  const sendItem = async (item: string) => {
    fetch("/api/", {
      method: "POST",
      body: JSON.stringify({ item: item }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const onSubmitHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItemsList((prevList) => prevList.concat(itemName));
  };

  const onClickHandler = () => {
    const flashCard = {
      _id: new ObjectId(Math.random() * 100),
      items: itemsList,
    };
    dispatch(listAction.addFlashCardToList(flashCard));
    router.push("/Quiz");
  };

  return (
    <div className="h-screen bg-red-500 grid place-items-center">
      <div className="h-[40rem] w-[30rem] bg-white flex">
        {flashCards.map((flashCard) => (
          <div>
            {flashCard.items.map((item) => (
              <div>{item}</div>
            ))}
          </div>
        ))}
        <form className="h-[10%] w-full self-end">
          <input onChange={onChangeHandler} className="w-full" />
          <button onClick={onSubmitHandler}>Add</button>
        </form>
        <button onClick={onClickHandler}>Start</button>
      </div>
    </div>
  );
};

export default FlashCardForm;
