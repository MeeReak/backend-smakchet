"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../utils/consts");
const base_custom_error_1 = __importDefault(require("./base-custom-error"));
class APIError extends base_custom_error_1.default {
    constructor(message, statusCode = consts_1.StatusCode.InternalServerError) {
        super(message, statusCode);
        Object.setPrototypeOf(this, APIError.prototype);
    }
    getStatusCode() {
        return this.statusCode;
    }
    serializeErrorOutput() {
        let errorMessageObject;
        try {
            errorMessageObject = JSON.parse(this.message);
        }
        catch (error) {
            // If parsing fails, return the message as is
            errorMessageObject = { message: this.message };
        }
        return { errors: [errorMessageObject] };
    }
}
exports.default = APIError;
//# sourceMappingURL=api-error.js.map