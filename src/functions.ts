import * as fs from "fs";
import * as path from "path";
import * as cliProgress from "cli-progress";
import * as Types from "./types";

export const getFiles = (directory: string): Array<Types.FileDetails> => {
  let files: Array<Types.FileDetails> = [];
  fs.readdirSync(directory).forEach((file: string) => {
    const absolutePath = path.join(directory, file);
    let stats = fs.statSync(absolutePath);
    let fileDetails: Types.FileDetails = {
      name: file,
      sortName: file.replace(/(\d+)/, (_match: string, num: string) =>
        num.padStart(10, "0")
      ),
      dateModified: stats.mtime,
      path: absolutePath,
    };
    if (!file.startsWith(".") && !stats.isDirectory()) {
      files.push(fileDetails);
    }
  });
  return files;
};

export const updateDates = (
  files: Array<Types.FileDetails>,
  sortOrder: Types.SortOrder,
  newName: boolean,
  reverse: boolean,
  directoryPath: string
): void => {
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
  if (!reverse) files.reverse;

  files.forEach((file, idx) => {
    iterationTime = new Date(iterationTime.getTime() + 1);
    file.dateModified = iterationTime;
    // console.log({ file, iterationTime });
    fs.utimesSync(file.path, iterationTime, iterationTime);
    if (newName) {
      fs.renameSync(
        file.path,
        path.join(
          directoryPath,
          `${idx.toString().padStart(5, "0")}_${file.name}`
        )
      );
    }
  });
};
