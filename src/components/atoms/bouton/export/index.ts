export interface IExportBtn {
  props: PropsType;
  emits: EmitsType;
}

type ObjType = {
  [key: string]: string | number | null;
};
// export state
type EmitsType = {
  (event: "exported", state: boolean): void;
  //(event: 'remove'): void
};

export enum ExportType {
  csv = "exportToCSV", // type => function name
  xls = "exportToXLS",
  xlsx = "exportToXLS",
  pdf = "pdf",
  img = "img",
}

export type FileDetailsType = {
  name: string;
  type: Lowercase<keyof typeof ExportType>;
  title?: string;
};

type PropsType = {
  data: ObjType[];
  fileDetails: FileDetailsType;
};
