"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const status_code_1 = require("../utils/consts/status-code");
const base_custom_error_1 = __importDefault(require("@api-gateway/Errors/base-custom-error"));
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof base_custom_error_1.default) {
        return res.status(err.getStatusCode()).json(err.serializeErrorOutput());
    }
    return res
        .status(status_code_1.StatusCode.InternalServerError)
        .json({ errors: [{ message: "An unexpected error occurred" }] });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map