"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignUpSchema = void 0;
const zod_1 = require("zod");
exports.UserSignUpSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(255), // Assuming a maximum length of 255 characters
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8), // Assuming a minimum password length of 6 characters
    role: zod_1.z.enum(["Organizer", "Volunteer"]), // Enumerated field
});
//# sourceMappingURL=userSchema.js.map