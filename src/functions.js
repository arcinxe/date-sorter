"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDates = exports.getFiles = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Types = __importStar(require("./types"));
const getFiles = (directory) => {
    let files = [];
    fs.readdirSync(directory).forEach((file) => {
        const absolutePath = path.join(directory, file);
        let stats = fs.statSync(absolutePath);
        let fileDetails = {
            name: file,
            sortName: file.replace(/(\d+)/, (_match, num) => num.padStart(10, "0")),
            dateModified: stats.mtime,
            path: absolutePath,
        };
        if (!file.startsWith(".") && !stats.isDirectory()) {
            files.push(fileDetails);
        }
    });
    return files;
};
exports.getFiles = getFiles;
const updateDates = (files, sortOrder, newName, reverse, directoryPath) => {
    let iterationTime = new Date();
    switch (sortOrder) {
        case Types.SortOrder.name:
            files.sort((a, b) => a.sortName.localeCompare(b.sortName));
            break;
        case Types.SortOrder.date:
            files.sort((a, b) => (a.dateModified > b.dateModified ? -1 : 1));
            break;
        default:
            break;
    }
    if (!reverse)
        files.reverse;
    files.forEach((file, idx) => {
        iterationTime = new Date(iterationTime.getTime() + 1);
        file.dateModified = iterationTime;
        // console.log({ file, iterationTime });
        fs.utimesSync(file.path, iterationTime, iterationTime);
        if (newName) {
            fs.renameSync(file.path, path.join(directoryPath, `${idx.toString().padStart(5, "0")}_${file.name}`));
        }
    });
};
exports.updateDates = updateDates;
