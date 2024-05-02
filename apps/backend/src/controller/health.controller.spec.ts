import { Request, Response } from 'express';
import { healthCheck } from './health.controller';

const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(),
} as unknown as Response;

describe('Health Check Endpoint', () => {
  test('responds with status 200 and "up"', async () => {
    await healthCheck(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ status: 'up' });
  });
});
