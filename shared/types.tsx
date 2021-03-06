import { ObjectId } from 'mongodb';

export interface FlashcardItemInterface {
  word: string;
  definition: string;
  id: number;
}

export interface Flashcard {
  _id?: ObjectId | string;
  id: string;
  items: FlashcardItemInterface[];
  title: string;
}
