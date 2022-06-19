import { ObjectId } from "mongodb";

export interface FlashCard {
  _id?: ObjectId;
  id: string;
  items: string[];
}
