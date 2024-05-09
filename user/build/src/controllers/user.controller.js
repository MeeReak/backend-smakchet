"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.userController = void 0;
const user_service_1 = require("@user/services/user.service");
const tsoa_1 = require("tsoa");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userservice = new user_service_1.UserServices();
let userController = class userController extends tsoa_1.Controller {
    UpdateProfile(userId, userProfileData, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw Error("Token not provided");
            }
            try {
                // Verify the token to authenticate the user
                const decodedToken = jsonwebtoken_1.default.verify(token, "your_jwt_secret_key");
                if (decodedToken.userId !== userId) {
                    throw new Error("User ID in token does not match");
                }
                // Call UserService to update user profile
                const updatedUserProfile = yield userservice.updateUserProfile(userId, userProfileData);
                return { message: 'User profile updated successfully', userProfile: updatedUserProfile };
            }
            catch (error) {
                throw Error(error);
            }
        });
    }
};
exports.userController = userController;
__decorate([
    (0, tsoa_1.Put)("/:userId"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "UpdateProfile", null);
exports.userController = userController = __decorate([
    (0, tsoa_1.Route)("/v1/user"),
    (0, tsoa_1.Tags)("User")
], userController);
//# sourceMappingURL=user.controller.js.map