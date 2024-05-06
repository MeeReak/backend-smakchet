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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.UserController = void 0;
const user_service_1 = require("@api-gateway/services/user.service");
const consts_1 = require("@api-gateway/utils/consts");
const createConfig_1 = __importDefault(require("@api-gateway/utils/createConfig"));
const generate_1 = require("@api-gateway/utils/generate");
const axios_1 = __importDefault(require("axios"));
const tsoa_1 = require("tsoa");
let UserController = class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
    }
    // TODO:
    // Save User
    // Generate Verification Token & Save to its DB
    // Publish User Detail to Notification Service
    SignUpWithEmail(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, role } = requestBody;
                const user = yield this.userService.create({
                    username,
                    email,
                    password,
                    role,
                });
                yield this.userService.saveVerifyToken({ id: user.id });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    VerifyEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.verifyEmail(token);
                const jwtToken = yield (0, generate_1.generateToken)(user.id, user.username);
                return jwtToken;
            }
            catch (error) {
                throw error;
            }
        });
    }
    LoginWithEmail(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = requestBody;
                return yield this.userService.login({ email, password });
            }
            catch (error) {
                throw error;
            }
        });
    }
    GoogleAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${(0, createConfig_1.default)().googleClientId}&redirect_uri=${(0, createConfig_1.default)().googleRedirectUri}&response_type=code&scope=profile email`;
            return url;
        });
    }
    GoogleAuthCallback(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Exchange authorization code for access token
                const { data } = yield axios_1.default.post("https://oauth2.googleapis.com/token", {
                    client_id: (0, createConfig_1.default)().googleClientId,
                    client_secret: (0, createConfig_1.default)().googleClientSecret,
                    redirect_uri: (0, createConfig_1.default)().googleRedirectUri,
                    code,
                    grant_type: "authorization_code",
                });
                const { access_token } = data;
                // Use access_token or id_token to fetch user profile
                const { data: userData } = yield axios_1.default.get("https://www.googleapis.com/oauth2/v1/userinfo", {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                const { id, name, email } = userData;
                //find the user in database
                const existedUser = yield this.userService.findUserByEmail({ email });
                //if user already have account, just update something
                if (existedUser) {
                    yield this.userService.updateUser({
                        id: existedUser.id,
                        data: {
                            googleId: id,
                            isVerify: true,
                        },
                    });
                    //generate jwtToken
                    return yield (0, generate_1.generateToken)(existedUser.id, existedUser.username);
                }
                //add user to database if new
                const user = yield this.userService.create({
                    email: email,
                    username: name,
                    googleId: id,
                    isVerify: true,
                    role: "Volunteer",
                });
                //generate jwtToken
                return yield (0, generate_1.generateToken)(user.id, user.username);
            }
            catch (error) {
                throw error;
            }
        });
    }
    FacebookAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${(0, createConfig_1.default)().facebookAppId}&redirect_uri=${(0, createConfig_1.default)().facebookRedirectUri}`;
                return url;
            }
            catch (error) {
                throw error;
            }
        });
    }
    FacebookAuthCallback(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Exchange authorization code for access token
                const { data } = yield axios_1.default.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${(0, createConfig_1.default)().facebookAppId}&client_secret=${(0, createConfig_1.default)().facebookAppSecret}&code=${code}&redirect_uri=${(0, createConfig_1.default)().facebookRedirectUri}`);
                const { access_token } = data;
                // Use access_token to fetch user profile
                const { data: profile } = yield axios_1.default.get(`https://graph.facebook.com/v13.0/me?fields=name,picture&access_token=${access_token}`);
                //add user to database if new
                const user = yield this.userService.create({
                    username: profile.name,
                    profile: profile.picture.url,
                    facebookId: profile.id,
                    isVerify: true,
                    role: "Volunteer",
                });
                //generate jwtToken
                return yield (0, generate_1.generateToken)(user.id, user.username);
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.Created, "Created"),
    (0, tsoa_1.Post)("/signup"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "SignUpWithEmail", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "OK"),
    (0, tsoa_1.Get)("/verify"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "VerifyEmail", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "OK"),
    (0, tsoa_1.Post)("/login"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "LoginWithEmail", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "OK"),
    (0, tsoa_1.Get)("/google")
    // Initiates the Google Login flow
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GoogleAuth", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "OK"),
    (0, tsoa_1.Get)("/google/callback")
    // Callback URL for handling the Google Login response
    ,
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GoogleAuthCallback", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "OK"),
    (0, tsoa_1.Get)("/facebook"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "FacebookAuth", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "OK"),
    (0, tsoa_1.Get)("/facebook/callback"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "FacebookAuthCallback", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)("auth"),
    __metadata("design:paramtypes", [])
], UserController);
//# sourceMappingURL=auth.controller.js.map