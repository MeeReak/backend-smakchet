"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
const zod_1 = require("zod");
const api_error_1 = __importDefault(require("@api-gateway/Errors/api-error"));
const consts_1 = require("../utils/consts");
const validateInput = (schema) => {
    return (_req, _res, _next) => {
        try {
            schema.parse(_req.body);
            _next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const formattedErrors = error.issues.reduce((acc, issue) => {
                    acc[issue.path[0]] = issue.message;
                    return acc;
                }, {});
                const formattedErrorString = JSON.stringify(formattedErrors);
                const inputError = new api_error_1.default(formattedErrorString, consts_1.StatusCode.NotFound);
                _next(inputError);
            }
            else {
                _next(new api_error_1.default("Internal Server Error!!", consts_1.StatusCode.BadRequest));
            }
        }
    };
};
exports.validateInput = validateInput;
//# sourceMappingURL=validate-input.js.map