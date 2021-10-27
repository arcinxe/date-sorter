#!/usr/bin/env node

import * as Functions from "./functions";
import * as Types from "./types";
import * as fs from "fs";
import * as path from "path";
import * as yargs from "yargs";

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

const sortOrder = Types.SortOrder[options.s as keyof typeof Types.SortOrder];
const newName = options.n;
let inputPath = "./";

if (fs.existsSync(path.resolve(inputPath))) {
  inputPath = path.resolve(inputPath);
} else {
  console.warn("Wrong input path");
  process.exit(1);
}

let files = Functions.getFiles(inputPath);
// console.log({ files });
Functions.updateDates(files, sortOrder, newName, false, inputPath);
