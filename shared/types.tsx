import { ObjectId } from "mongodb";

export interface FlashCard {
  _id: ObjectId;
  items: string[];
}
