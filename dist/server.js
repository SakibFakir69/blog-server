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
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("."); // make sure index.ts exports your express app
const port = process.env.PORT || 5000;
let server;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        server = _1.ServerApp.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
    }
}))();
// Graceful shutdown when Ctrl + C or system stop
process.on("SIGINT", () => {
    if (server) {
        server.close(() => {
            console.log("🛑 Server closed gracefully.");
            process.exit(0);
        });
    }
    else {
        process.exit(0);
    }
});
