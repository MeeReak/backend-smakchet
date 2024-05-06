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
exports.TokenRepository = void 0;
const token_model_1 = __importDefault(require("../model/token.model"));
// import { Token } from "./@types/repository.type";
class TokenRepository {
    //create token
    Create(tokenDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield token_model_1.default.create(tokenDetail);
            }
            catch (error) {
                throw error;
            }
        });
    }
    //find token by userID
    FindTokenByUserId(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId }) {
            try {
                return yield token_model_1.default.findById({ userId });
            }
            catch (error) {
                throw error;
            }
        });
    }
    //find token by token
    FindTokenByToken(_a) {
        return __awaiter(this, arguments, void 0, function* ({ token }) {
            try {
                return yield token_model_1.default.findOne({ token });
            }
            catch (error) {
                throw error;
            }
        });
    }
    //delete token by token
    DeleleToken(_a) {
        return __awaiter(this, arguments, void 0, function* ({ token }) {
            try {
                return yield token_model_1.default.findOneAndDelete({ token });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.TokenRepository = TokenRepository;
//# sourceMappingURL=token.repository.js.map