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
exports.userController = void 0;
const user_services_1 = require("./user.services");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.createUser(req.body);
        console.log("user api hit");
        return res.status(201).json({
            status: true,
            message: "User Created Successfully",
            data: result
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                status: false,
                message: error.message,
                name: error.name,
                stack: error.stack,
            });
        }
        else {
            // if the thrown thing is not an Error (rare but possible)
            return res.status(500).json({
                status: false,
                message: "An unknown error occurred",
            });
        }
    }
});
exports.userController = {
    createUser
};
