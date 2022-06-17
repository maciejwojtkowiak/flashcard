import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { listAction } from "../../src/store/list-slice";

const Main = () => {
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState<string>("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };
  const onSubmitHandler = () => {
    dispatch(listAction.addNameToList(itemName));
  };
  return (
    <div className="h-screen bg-red-500 grid place-items-center">
      <div className="h-[40rem] w-[30rem] bg-white flex">
        <form className="h-[10%] w-full self-end">
          <input onChange={onChangeHandler} className="w-full" />
          <button type="submit" onSubmit={onSubmitHandler}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Main;
