import mongoose from "mongoose";

import { type Board, type BoardColumn, type BoardCard } from "./types";

const cardSchema = new mongoose.Schema<BoardCard>({
  name: {
    type: String,
    minlegth: 2,
    maxlength: 30,
    required: true,
  },
  subscription: String,
});

const columnSchema = new mongoose.Schema<BoardColumn>({
  name: String,
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const boardSchema = new mongoose.Schema<Board>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    columns: [columnSchema],
    cards: [cardSchema],
  },
  { versionKey: false }
);

export const BoardModel = mongoose.model<Board>("Board", boardSchema);
