"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosesService_1 = __importDefault(require("../services/diagnosesService"));
const router = express_1.default.Router();
router.use("/", (_req, res) => {
    return res.json(diagnosesService_1.default.getAll());
});
exports.default = router;
