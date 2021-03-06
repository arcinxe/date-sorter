#!/usr/bin/env node
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
const Functions = __importStar(require("./functions"));
const Types = __importStar(require("./types"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const yargs = __importStar(require("yargs"));
const options = yargs
    .option("s", {
    alias: "sort-order",
    describe: "Sort order of output files",
    default: "date",
    choices: ["name", "date"],
    type: "string",
    demandOption: false,
})
    .option("r", {
    alias: "reverse-order",
    describe: "Reverses ordering",
    type: "boolean",
    default: false,
    demandOption: false,
})
    .option("n", {
    alias: "new-name",
    describe: "Adds counter prefix to the name",
    type: "boolean",
    default: false,
    demandOption: false,
}).argv;
const sortOrder = Types.SortOrder[options.s];
const newName = options.n;
let inputPath = "./";
if (fs.existsSync(path.resolve(inputPath))) {
    inputPath = path.resolve(inputPath);
}
else {
    console.warn("Wrong input path");
    process.exit(1);
}
let files = Functions.getFiles(inputPath);
// console.log({ files });
Functions.updateDates(files, sortOrder, newName, false, inputPath);
