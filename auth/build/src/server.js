"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateKey = void 0;
const app_1 = __importDefault(require("./app"));
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const createConfig_1 = __importDefault(require("./utils/createConfig"));
const config = (0, createConfig_1.default)();
// READ FILE JWT PUBLIC KEY FIRST
exports.privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, "../private_key.pem"), "utf-8");
//conect to the moongo
mongoose_1.default
    .connect(config.mongoUrl)
    .then(() => {
    //listen for requests
    app_1.default.listen(config.port, () => {
        console.log("Connect to mongose DB & Listen on port 3000");
    });
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=server.js.map