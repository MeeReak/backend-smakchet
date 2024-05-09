"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Global error handler middleware
function errorHandler(err, _req, res, next) {
    // Default to 500 if no status code is set
    const statusCode = res.statusCode || 500;
    // Send response to client
    res.status(statusCode).json({
        statusCode: statusCode,
        message: err.message,
    });
    next();
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map