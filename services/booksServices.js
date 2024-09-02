import { Book } from "../models/Book";

export const addBook = async data => {
  return (newBook = await Book.create(data));
};
