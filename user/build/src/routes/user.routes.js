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
const user_controller_1 = require("@user/controllers/user.controller");
const express_1 = __importDefault(require("express"));
const userRoute = express_1.default.Router();
const usercontroller = new user_controller_1.userController();
userRoute.put("/:userId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = req.params.id;
    const userProfileData = req.body;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract token from Authorization header
    try {
        // Pass userId, userProfileData, and token to controller function
        const result = yield usercontroller.UpdateProfile(userId, userProfileData, token);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
userRoute.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "hello" });
}));
exports.default = userRoute;
//# sourceMappingURL=user.routes.js.map