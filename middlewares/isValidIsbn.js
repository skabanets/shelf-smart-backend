import { isbnRegexp } from "../constants/book-constants.js";
import { HttpError } from "../helpers/HttpError.js";

export const isValidIsbn = (req, res, next) => {
  const { isbn } = req.params;

  if (!isbnRegexp.test(isbn)) {
    return next(HttpError(400, `${isbn} is not a valid ISBN`));
  }

  next();
};
