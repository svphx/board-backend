import mongoose from "mongoose";

export type Board = {
  id: string;
  name: string;
  participants: mongoose.SchemaDefinitionProperty[];
  columns: BoardColumn[];
  cards: BoardCard[];
};
export type BoardColumn = {
  id: string;
  name: string;
  cards: string[];
};
export type BoardCard = {
  id: string;
  name: string;
  subscription: string;
};
