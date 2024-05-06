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
exports.generateToken = exports.generateVerifyToken = void 0;
const server_1 = require("@api-gateway/server");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const createConfig_1 = __importDefault(require("./createConfig"));
const generateVerifyToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, crypto_1.randomBytes)(32).toString("hex");
    }
    catch (error) {
        throw error;
    }
});
exports.generateVerifyToken = generateVerifyToken;
const generateToken = (id, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // JWT payload containing user information
        const payload = {
            userId: id,
            username: username,
        };
        // Generate and return the JWT
        const token = jsonwebtoken_1.default.sign(payload, server_1.privateKey, {
            expiresIn: parseInt((0, createConfig_1.default)().jwtExpiresIn),
            algorithm: "RS256",
        });
        return token;
    }
    catch (error) {
        throw error;
    }
});
exports.generateToken = generateToken;
//# sourceMappingURL=generate.js.map