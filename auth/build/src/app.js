"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createConfig_1 = __importDefault(require("./utils/createConfig"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/v1/user.routes"));
const error_handler_1 = require("./middlewares/error-handler");
// Create express app
const app = (0, express_1.default)();
const config = (0, createConfig_1.default)();
// ===================
// Security Middleware
// ===================
app.set("trust proxy", 1);
app.use((0, hpp_1.default)());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: config.apiGateway,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
// =======================
// Standard Middleware
// =======================
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "200mb" }));
app.use(express_1.default.static("public"));
app.use((_req, _res, _next) => {
    console.log(_req.path, _req.method);
    _next();
});
app.use(express_1.default.static("public"));
// serve your swagger.json file
app.get("/docs/swagger.json", (_req, res) => {
    res.sendFile("swagger.json", { root: "." });
});
//routes
app.use("/v1/auth", user_routes_1.default);
// ========================
// Global Error Handler
// ========================
app.use(error_handler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map