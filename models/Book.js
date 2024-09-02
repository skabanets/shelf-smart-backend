import { Schema, model } from "mongoose";
import { isbnRegexp } from "../constants/book-constants";

const bookShema = new Schema(
  {
    isbn: {
      type: String,
      match: [isbnRegexp, "ISBN is not valid"],
      unique: true,
      required: [true, "ISBN is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    isBorrowed: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

export const Book = model("Book", bookShema);
