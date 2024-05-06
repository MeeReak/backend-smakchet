"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tokenSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    token: { type: String, required: true },
    expired: { type: Date, required: true },
    created_at: { type: Date },
}, {
    toJSON: {
        transform(_doc, ret) {
            delete ret.__v;
            delete ret.password;
        },
    },
});
const TokenModel = mongoose_1.default.model("Token", tokenSchema);
exports.default = TokenModel;
//# sourceMappingURL=token.model.js.map