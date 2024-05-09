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
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
class UserRepository {
    updateUserProfile(userId, userProfileData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
                    return null;
                }
                const user = yield user_model_1.default.findByIdAndUpdate(userId, userProfileData, { new: true });
                if (!user) {
                    throw Error('User not found. Please check the provided ID.'); // Create custom error
                }
                return user;
            }
            catch (error) {
                throw Error(error);
            }
        });
    }
}
exports.default = UserRepository;
//# sourceMappingURL=user.reposities.js.map