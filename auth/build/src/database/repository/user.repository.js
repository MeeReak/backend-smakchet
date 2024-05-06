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
exports.UserRepository = void 0;
const api_error_1 = __importDefault(require("@api-gateway/Errors/api-error"));
const user_model_1 = __importDefault(require("../model/user.model"));
const duplicat_error_1 = __importDefault(require("@api-gateway/Errors/duplicat-error"));
const consts_1 = require("@api-gateway/utils/consts");
class UserRepository {
    CreateUser(userDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.create(userDetail);
            }
            catch (error) {
                if (error instanceof duplicat_error_1.default) {
                    throw error;
                }
                throw new api_error_1.default("Unable to Create User in Database");
            }
        });
    }
    //find user by email
    FindUserByEmail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email }) {
            try {
                return yield user_model_1.default.findOne({ email: email });
            }
            catch (error) {
                throw new api_error_1.default("Unable to Find User in Database");
            }
        });
    }
    //fint user by id
    FindUserById(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                return yield user_model_1.default.findById(id);
            }
            catch (error) {
                throw new api_error_1.default("Unable to Find User in Database");
            }
        });
    }
    //update user by id
    UpdateUserById(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, newDetail, }) {
            try {
                const isExit = yield this.FindUserById({ id: id });
                if (!isExit) {
                    throw new api_error_1.default("User does not exist", consts_1.StatusCode.NotFound);
                }
                return yield user_model_1.default.findByIdAndUpdate(id, newDetail, { new: true });
            }
            catch (error) {
                if (error instanceof api_error_1.default) {
                    throw error;
                }
                throw new api_error_1.default("Unable to Update User in Database");
            }
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map