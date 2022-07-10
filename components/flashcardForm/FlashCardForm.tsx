import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flashcard,
  FlashcardItemInterface,
} from '../../shared/types';
import { listAction } from '../../store/list-slice';
import { RootState } from '../../store/store';
import FlashcardItem from './FlashcardItem';
import Notification from '../Notification/Notification';
import { notificationAction } from '../../store/notification-slice';

const FlashcardForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [itemsList, setItemsList] = useState<
    FlashcardItemInterface[]
  >([]);
  const [title, setTitle] = useState<string>('');
  const notificationIsShown = useSelector(
    (state: RootState) => state.notificationSlice.isShown
  );

  const sendFlashcard = async (flashcard: Flashcard) => {
    fetch('/api/', {
      method: 'POST',
      body: JSON.stringify({ ...flashcard }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  const onAddHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const flashcardItem = {
      word: '',
      definition: '',
      id: Math.random(),
    };

    setItemsList((prevList) => prevList.concat(flashcardItem));
  };

  const onClickHandler = () => {
    const someFlashcardIsEmpty = itemsList.some(
      (flashcard) =>
        flashcard.word.length === 0 ||
        flashcard.definition.length === 0
    );

    if (title.length === 0) {
      dispatch(
        notificationAction.setNotification({
          message: 'Title can not be empty',
          isShown: true,
        })
      );
      return;
    }

    if (someFlashcardIsEmpty) {
      dispatch(
        notificationAction.setNotification({
          message: 'Some flashcards are empty',
          isShown: true,
        })
      );
      return;
    }

    const flashCard = {
      title: title,
      id: Math.random().toString(),
      items: itemsList,
    };
    dispatch(listAction.addFlashCardToList(flashCard));
    sendFlashcard(flashCard);
    router.push('/quiz/' + flashCard.id);
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

  const deleteItem = (item: FlashcardItemInterface) => {
    console.log('ITEM', item);
    setItemsList((prevItems) =>
      prevItems.filter((card) => {
        return card.id !== item.id;
      })
    );
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      dispatch(
        notificationAction.setNotification({
          message: '',
          isShown: false,
        })
      );
    }, 2000);
    return () => clearTimeout(notificationTimeout);
  }, [notificationIsShown]);

  return (
    <div className="h-screen  grid place-items-center">
      {notificationIsShown && (
        <div className="absolute right-0 top-0 mr-16 mt-8 border-4 border-red-500 py-4 px-8 rounded-lg font-bold text-xl drop-shadow-2xl shadow-2xl">
          <Notification />
        </div>
      )}

      <div className="h-[40rem] w-[30rem] drop-shadow-2xl shadow-2xl ">
        <div className=" h-[35rem] w-full overflow-auto">
          <div className=" flex justify-center mx-4 ">
            <input
              onChange={onTitleChange}
              placeholder="Set title"
              className="border-b-2 border-blue-400 bg-gray-200 py-2 px-1 focus:outline-none my-8"
            />
          </div>

          {itemsList.map((item, i) => (
            <FlashcardItem
              key={i}
              item={item}
              updateItem={updateItems}
              deleteItem={deleteItem}
            />
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
