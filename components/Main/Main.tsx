import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAction } from "../../src/store/list-slice";
import { RootState } from "../../src/store/store";

const Main = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [itemName, setItemName] = useState<string>("");
  const items = useSelector((state: RootState) => state.listSlice.listOfCards);

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
    dispatch(listAction.addNameToList(itemName));
  };

  const onClickHandler = () => {
    router.push("/Quiz");
  };

  return (
    <div className="h-screen bg-red-500 grid place-items-center">
      <div className="h-[40rem] w-[30rem] bg-white flex">
        {items.map((item) => (
          <div>{item}</div>
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

export default Main;
