import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FlashCard, FlashcardItemInterface } from "../../shared/types";
import { listAction } from "../../src/store/list-slice";
import FlashcardItem from "./FlashcardItem";

const FlashcardForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [itemsList, setItemsList] = useState<FlashcardItemInterface[]>([]);

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

    const flashcardItem = {
      word: "",
      definition: "",
      id: Math.random(),
    };

    setItemsList((prevList) => prevList.concat(flashcardItem));
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

  const updateItems = (item: FlashcardItemInterface) => {
    setItemsList((prevItems) => {
      return prevItems.map((flashcardItem) => {
        if (flashcardItem.id === item.id) {
          return {
            ...flashcardItem,
            word: item.word,
            definition: item.definition,
          };
        }
        return flashcardItem;
      });
    });
  };

  console.log(itemsList);

  return (
    <div className="h-screen  grid place-items-center">
      <div className="h-[40rem] w-[30rem] drop-shadow-2xl shadow-2xl ">
        <div className=" h-[35rem] w-full ">
          {itemsList.map((item) => (
            <FlashcardItem item={item} updateItem={updateItems} />
          ))}
        </div>
        <div className="grid grid-rows-2 h-[5rem]">
          <form className=" self-end grid place-items-center ">
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
