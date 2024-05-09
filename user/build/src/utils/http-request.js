"use strict";
// httpRequest.ts
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
exports.getUserInfo = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * Perform an HTTP GET request to the specified URL.
 * @param {string} url The URL to make the GET request to.
 * @param {string | null} token Optional authentication token (JWT token).
 * @returns {Promise<any>} A promise resolving to the response data.
 */
function getUserInfo(url, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            const response = yield axios_1.default.get(url, { headers });
            return response.data;
        }
        catch (error) {
            throw new Error(`HTTP GET request to ${url} failed: ${error.message}`);
        }
    });
}
exports.getUserInfo = getUserInfo;
//# sourceMappingURL=http-request.js.map