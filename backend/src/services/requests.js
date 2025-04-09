import { RequestsCollection } from '../db/models/requests.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllRequests = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const baseQuery = RequestsCollection.find();

  const [requestsCount, requests] = await Promise.all([
    RequestsCollection.countDocuments(),
    baseQuery.skip(skip).limit(limit).exec(),
  ]);

  const paginationData = calculatePaginationData(requestsCount, perPage, page);

  return {
    data: requests,
    ...paginationData,
  };
};

export const getRequestById = async (requestId) => {
  const request = await RequestsCollection.findById(requestId);
  console.log(request);

  return request;
};

export const createRequest = async (payload) => {
  const request = await RequestsCollection.create(payload);
  return request;
};

export const deleteRequest = async (requestId) => {
  const request = await RequestsCollection.findOneAndDelete({
    _id: requestId,
  });
  return request;
};

export const updateRequest = async (requestId, payload) => {
  const updatedRequest = await RequestsCollection.findOneAndUpdate(
    { _id: requestId },
    payload,
    { new: true },
  );
  return updatedRequest;
};
