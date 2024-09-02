import Joi from "joi";
import { isbnRegexp } from "../constants/book-constants.js";

export const createBookSchema = Joi.object({
  isbn: Joi.string().pattern(isbnRegexp).required().messages({
    "string.pattern.base": "ISBN is not valid",
    "any.required": "ISBN is required",
  }),
  title: Joi.string().min(5).max(40).required().messages({
    "string.min": "Title must contain at least {#limit} characters.",
    "string.max": "Title must contain at most {#limit} characters.",
    "any.required": "Title is required",
  }),
  author: Joi.string().min(5).max(40).required().messages({
    "string.min": "Author must contain at least {#limit} characters.",
    "string.max": "Author must contain at most {#limit} characters.",
    "any.required": "Author is required",
  }),
  isBorrowed: Joi.boolean().default(false),
});
