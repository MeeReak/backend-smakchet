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
exports.UserService = void 0;
const user_repository_1 = require("@api-gateway/database/repository/user.repository");
const generate_1 = require("@api-gateway/utils/generate");
const duplicat_error_1 = __importDefault(require("@api-gateway/Errors/duplicat-error"));
// import BaseCustomError from "@api-gateway/Errors/base-custom-error";
// import { StatusCode } from "@api-gateway/utils/consts";
const api_error_1 = __importDefault(require("@api-gateway/Errors/api-error"));
const token_repository_1 = require("@api-gateway/database/repository/token.repository");
const consts_1 = require("@api-gateway/utils/consts");
const password_1 = require("@api-gateway/utils/password");
class UserService {
    constructor() {
        this.userRepo = new user_repository_1.UserRepository();
        this.tokenRepo = new token_repository_1.TokenRepository();
    }
    // NOTE: THIS METHOD WILL USE BY SIGNUP WITH EMAIL & OAUTH
    // TODO:
    // Hash The Password If Register With Email
    // Save User to DB
    // If Error, Check Duplication
    // Duplication case 1: Sign Up Without Verification
    // Duplication case 2: Sign Up With The Same Email
    create(userDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //hashing password
                const hasdPassword = userDetail.password && (yield (0, password_1.hashPassword)(userDetail.password));
                //check if the email already signup
                const existedUser = userDetail.email &&
                    (yield this.userRepo.FindUserByEmail({
                        email: userDetail.email,
                    }));
                if (existedUser) {
                    if (!existedUser.isVerify) {
                        throw new duplicat_error_1.default("That email already signed up. Please verify!!");
                    }
                    throw new duplicat_error_1.default("You can't sign up with that email!!");
                }
                let newData = Object.assign(Object.assign({}, userDetail), { password: hasdPassword });
                return yield this.userRepo.CreateUser(newData);
            }
            catch (error) {
                if (error instanceof duplicat_error_1.default) {
                    throw error;
                }
                throw new api_error_1.default("Somthing went wrong!");
            }
        });
    }
    // TODO:
    // Generate Verify Token
    // Save the Verify Token in the Database
    saveVerifyToken(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const token = yield (0, generate_1.generateVerifyToken)();
                const currentDate = new Date();
                const expiredDate = new Date(currentDate.getTime() + 1 * 60 * 1000); // Adding 2 minutes
                const tokenDetail = {
                    userId: id,
                    token: token,
                    create_at: currentDate,
                    expired: expiredDate,
                };
                return yield this.tokenRepo.Create(tokenDetail);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // TODO :
    // find the token in the database
    // find that user in the database
    // change isVerify to true
    // delect that token from the database
    verifyEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exitedToken = yield this.tokenRepo.FindTokenByToken({ token });
                //check if the token is invalid
                if (!exitedToken) {
                    throw new api_error_1.default("Verification token is invalid", consts_1.StatusCode.BadRequest);
                }
                if (new Date() > exitedToken.expired) {
                    yield this.tokenRepo.DeleleToken({ token: exitedToken.token });
                    const token = yield (0, generate_1.generateVerifyToken)();
                    const currentDate = new Date();
                    const expiredDate = new Date(currentDate.getTime() + 1 * 60 * 1000); // Adding 2 minutes
                    const tokenDetail = {
                        userId: exitedToken.userId,
                        token: token,
                        create_at: currentDate,
                        expired: expiredDate,
                    };
                    yield this.tokenRepo.Create(tokenDetail);
                    throw new api_error_1.default("That Token is Expired. Please check a new Token!!", consts_1.StatusCode.NotFound);
                }
                const user = yield this.userRepo.FindUserById({
                    id: exitedToken.userId.toString(),
                });
                if (!user) {
                    throw new api_error_1.default("User does not exist.", consts_1.StatusCode.NotFound);
                }
                //change the verify to true
                user.isVerify = true;
                yield user.save();
                //after verify success delete the token
                yield this.tokenRepo.DeleleToken({ token });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // TODO:
    // Find user by email
    // Validate the password
    // Generate Token & Return
    login(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            try {
                const existedUser = yield this.userRepo.FindUserByEmail({ email });
                if (!existedUser) {
                    throw new api_error_1.default("User not exist", consts_1.StatusCode.NotFound);
                }
                const isPassword = existedUser.password &&
                    (yield (0, password_1.verifyPassword)({
                        password: password,
                        hashPassword: existedUser.password,
                    }));
                if (!isPassword) {
                    throw new api_error_1.default("The email or password you entered is incorrect. Please double-check and try again.");
                }
                const jwtToken = yield (0, generate_1.generateToken)(existedUser.id, existedUser.username);
                return jwtToken;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findUserByEmail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email }) {
            try {
                return yield this.userRepo.FindUserByEmail({ email });
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, data }) {
            try {
                const user = yield this.userRepo.FindUserById({ id });
                if (!user) {
                    throw new api_error_1.default("User does not exist", consts_1.StatusCode.NotFound);
                }
                return yield this.userRepo.UpdateUserById({ id: id, newDetail: data });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map