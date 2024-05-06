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
exports.verifyPassword = exports.hashPassword = void 0;
const api_error_1 = __importDefault(require("@api-gateway/Errors/api-error"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcrypt_1.default.hash(password, 10);
    }
    catch (error) {
        throw new api_error_1.default("Unable to generate password");
    }
});
exports.hashPassword = hashPassword;
const verifyPassword = (_a) => __awaiter(void 0, [_a], void 0, function* ({ password, hashPassword, }) {
    try {
        return yield bcrypt_1.default.compare(password, hashPassword);
    }
    catch (error) {
        throw new api_error_1.default("Unable to compare passwords!");
    }
});
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=password.js.map