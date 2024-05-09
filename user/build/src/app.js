"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_handler_1 = require("@user/middlewares/error-handler");
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = require("body-parser");
const config_1 = __importDefault(require("@user/utils/config"));
const logger_handler_1 = __importDefault(require("@user/middlewares/logger-handler"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = (0, express_1.default)();
// Get the Configs
const config = (0, config_1.default)(process.env.NODE_ENV);
// =======================
// Security Middlewares
// =======================
app.set("trust proxy", 1);
app.use((0, hpp_1.default)());
app.use((0, helmet_1.default)());
// app.use(
//   cookieSession({
//     name: "session",
//     keys: [`${config.cookieSecretKeyOne}`, `${config.cookieSecretKeyTwo}`],
//     maxAge: 24 * 7 * 3600000,
//     secure: config.env !== "development", // update with value from config
//     ...(config.env !== "development" && {
//       sameSite: "none",
//     }),
//   })
// );
app.use((0, cors_1.default)({
    origin: config.apiGatewayUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
// =======================
// Standard Middleware
// =======================
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: "200mb" }));
app.use((0, body_parser_1.urlencoded)({ extended: true, limit: "200mb" }));
app.use(express_1.default.static("public"));
app.use(logger_handler_1.default);
// ========================
// Global API V1
// ========================
app.use("/api/v1/user", user_routes_1.default);
// ========================
// Global Error Handler
// ========================
app.use(error_handler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map