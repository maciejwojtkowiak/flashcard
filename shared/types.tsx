import { ObjectId } from "mongodb";

export interface FlashcardItemInterface {
  word: string;
  definition: string;
  id: number;
}

export interface FlashCard {
  _id?: ObjectId | string;
  id: string;
  title: string;
  items: FlashcardItemInterface[];
  dateOfCreation: Date;
}
