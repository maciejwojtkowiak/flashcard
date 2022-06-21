import { ObjectId } from "mongodb";

export interface FlashCard {
  _id?: ObjectId | string;
  id: string;
  items: string[];
}
