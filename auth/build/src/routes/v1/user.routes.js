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
const auth_controller_1 = require("@api-gateway/controllers/auth.controller");
const consts_1 = require("@api-gateway/utils/consts");
const express_1 = __importDefault(require("express"));
const userSchema_1 = require("@api-gateway/schema/userSchema");
const route_defs_1 = require("./route-defs");
const validate_input_1 = require("@api-gateway/middlewares/validate-input");
const AuthRoute = express_1.default.Router();
AuthRoute.post(route_defs_1.ROUTE_PATHS.AUTH.SIGN_UP, (0, validate_input_1.validateInput)(userSchema_1.UserSignUpSchema), (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const controller = new auth_controller_1.UserController();
        const user = yield controller.SignUpWithEmail(req.body);
        res.status(consts_1.StatusCode.Created).json(user);
    }
    catch (error) {
        _next(error);
    }
}));
AuthRoute.get(route_defs_1.ROUTE_PATHS.AUTH.VERIFY, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const controller = new auth_controller_1.UserController();
        yield controller.VerifyEmail(req.query.token);
        res.status(consts_1.StatusCode.Accepted).json({ message: "Succues" });
    }
    catch (error) {
        _next(error);
    }
}));
AuthRoute.get(route_defs_1.ROUTE_PATHS.AUTH.LOGIN, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const controller = new auth_controller_1.UserController();
        yield controller.LoginWithEmail(req.body);
        res.status(consts_1.StatusCode.Created).json({ message: "Succues" });
    }
    catch (error) {
        _next(error);
    }
}));
AuthRoute.get(route_defs_1.ROUTE_PATHS.AUTH.GOOGLE, (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const controller = new auth_controller_1.UserController();
        const url = yield controller.GoogleAuth();
        res.redirect(url);
    }
    catch (error) {
        _next(error);
    }
}));
AuthRoute.get(route_defs_1.ROUTE_PATHS.AUTH.GOOGLE_CALLBACK, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const controller = new auth_controller_1.UserController();
        yield controller.GoogleAuthCallback(req.query.code);
        res.status(consts_1.StatusCode.Accepted).json({ message: "Succues" });
    }
    catch (error) {
        _next(error);
    }
}));
AuthRoute.get(route_defs_1.ROUTE_PATHS.AUTH.FACEBOOK, (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const controller = new auth_controller_1.UserController();
        const url = yield controller.FacebookAuth();
        res.redirect(url);
    }
    catch (error) {
        _next(error);
    }
}));
AuthRoute.get("/facebook/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const controller = new auth_controller_1.UserController();
        yield controller.FacebookAuthCallback(req.query.code);
        res.status(consts_1.StatusCode.Created).json("Success");
    }
    catch (error) {
        res.status(consts_1.StatusCode.InternalServerError).json({ message: "Failed" });
    }
}));
exports.default = AuthRoute;
//# sourceMappingURL=user.routes.js.map