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
      id: Math.random().toString(),
      items: itemsList,
    };
    dispatch(listAction.addFlashCardToList(flashCard));
    router.push("/quiz");
  };

  return (
    <div className="h-screen bg-red-500 grid place-items-center">
      <div className="h-[40rem] w-[30rem] bg-white flex">
        <form className="h-[10%] w-full self-end">
          <input className="w-full" />
          <button>Add</button>
        </form>
        <button onClick={onClickHandler}>Start</button>
      </div>
    </div>
  );
};

export default FlashCardForm;
