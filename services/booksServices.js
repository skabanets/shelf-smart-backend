import { Book } from "../models/Book.js";

export const addBook = async data => {
  const newBook = await Book.create(data);
  return newBook;
};
