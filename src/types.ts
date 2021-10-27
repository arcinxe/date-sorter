import { number } from "yargs";

export interface FileDetails {
  name: string
  sortName: string
  path: string
  dateModified: Date
}
export enum SortOrder {
  name,
  date
}