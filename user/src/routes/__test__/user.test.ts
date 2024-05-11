import request from 'supertest';
import express from 'express';
import userRoute from '../user.routes';
import { userController } from '@user/controllers/user.controller';

// Mock userController
jest.mock('@user/controllers/user.controller');

// Create an instance of Express app and use userRoute
const app = express();
app.use(express.json());
app.use('/api/v1/user', userRoute);

describe('User Route Tests', () => {
  afterEach(() => {
    jest.restoreAllMocks(); // Restore mocked functions after each test
  });

  it('should handle PUT request to /api/v1/user/:id', async () => {
    const userId = '123';
    const userProfileData = { name: 'John Doe', email: 'john@example.com' };
    const token = 'mockedToken';
    const expectedResult = {
      success: true,
      message: 'Profile updated successfully',
    };
  
    // Mock userController method
    (userController.prototype.UpdateProfile as jest.Mock).mockResolvedValueOnce(expectedResult);
  
    // Send PUT request to the user route
    const response = await request(app)
      .put(`/api/v1/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userProfileData);
  
    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResult);
  });

  it('should handle errors thrown by userController', async () => {
    const userId = '123';
    const userProfileData = { name: 'John Doe', email: 'john@example.com' };
    const token = 'mockedToken';
    const errorMessage = 'User not found';

    // Mock the UpdateProfile method of userController to throw an error
    const mockUpdateProfile = jest.fn().mockRejectedValue(new Error(errorMessage));
    (userController as jest.Mocked<typeof userController>).prototype.UpdateProfile = mockUpdateProfile;

    // Send a PUT request to the user route
    const response = await request(app)
      .put(`/api/v1/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userProfileData);

    // Assertions
    expect(response.status).toBe(500); // Assuming error handling returns 500 status
    expect(response.body).toEqual({ message: errorMessage });

    // Verify that UpdateProfile method of userController was called with the correct arguments
    expect(mockUpdateProfile).toHaveBeenCalledWith(userId, userProfileData, token);
  });
});
