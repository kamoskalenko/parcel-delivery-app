import {
  getAllRequests,
  getRequestById,
  createRequest,
  deleteRequest,
  updateRequest,
} from '../services/requests.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getRequestsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const requests = await getAllRequests({
    page,
    perPage,
  });

  res.json({
    status: 200,
    message: 'Successfully found requests!',
    data: requests,
  });
};

export const getRequestByIdController = async (req, res, next) => {
  const { requestId } = req.params;

  const request = await getRequestById(requestId);

  if (!request) {
    next(createHttpError(404, 'Request not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found request with id ${requestId}!`,
    data: request,
  });
};

export const createRequestController = async (req, res) => {
  const request = await createRequest(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a request!`,
    data: request,
  });
};

export const deleteRequestController = async (req, res, next) => {
  const { requestId } = req.params;

  const request = await deleteRequest(requestId);

  if (!request) {
    next(createHttpError(404, 'Request not found'));
    return;
  }

  res.status(204).send();
};

export const updateRequestController = async (req, res, next) => {
  const { requestId } = req.params;
  const updatedRequest = await updateRequest(requestId, req.body);

  if (!updatedRequest) {
    next(createHttpError(404, 'Request not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully updated the request!',
    data: updatedRequest,
  });
};
