"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("../user.routes"));
const user_controller_1 = require("@user/controllers/user.controller");
// Mock userController
jest.mock('@user/controllers/user.controller');
// Create an instance of Express app and use userRoute
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/user', user_routes_1.default);
describe('User Route Tests', () => {
    afterEach(() => {
        jest.restoreAllMocks(); // Restore mocked functions after each test
    });
    it('should handle PUT request to /api/v1/user/:id', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = '123';
        const userProfileData = { name: 'John Doe', email: 'john@example.com' };
        const token = 'mockedToken';
        const expectedResult = {
            success: true,
            message: 'Profile updated successfully',
        };
        // Mock userController method
        user_controller_1.userController.prototype.UpdateProfile.mockResolvedValueOnce(expectedResult);
        // Send PUT request to the user route
        const response = yield (0, supertest_1.default)(app)
            .put(`/api/v1/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(userProfileData);
        // Assertions
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResult);
    }));
    it('should handle errors thrown by userController', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = '123';
        const userProfileData = { name: 'John Doe', email: 'john@example.com' };
        const token = 'mockedToken';
        const errorMessage = 'User not found';
        // Mock the UpdateProfile method of userController to throw an error
        const mockUpdateProfile = jest.fn().mockRejectedValue(new Error(errorMessage));
        user_controller_1.userController.prototype.UpdateProfile = mockUpdateProfile;
        // Send a PUT request to the user route
        const response = yield (0, supertest_1.default)(app)
            .put(`/api/v1/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(userProfileData);
        // Assertions
        expect(response.status).toBe(500); // Assuming error handling returns 500 status
        expect(response.body).toEqual({ message: errorMessage });
        // Verify that UpdateProfile method of userController was called with the correct arguments
        expect(mockUpdateProfile).toHaveBeenCalledWith(userId, userProfileData, token);
    }));
});
//# sourceMappingURL=user.test.js.map