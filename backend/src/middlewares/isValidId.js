import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { requestId } = req.params;
  if (!isValidObjectId(requestId)) {
    throw createHttpError(400, `'${requestId}' is invalid id`);
  }

  next();
};
