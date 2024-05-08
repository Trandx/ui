/**
 * __  ___     _____                       _
 * \ \/ / |___| ____|_  ___ __   ___  _ __| |_
 *  \  /| / __|  _| \ \/ / '_ \ / _ \| '__| __|
 *  /  \| \__ \ |___ >  <| |_) | (_) | |  | |_
 * /_/\_\_|___/_____/_/\_\ .__/ \___/|_|   \__|
 *                       |_|
 * 6/12/2017
 * Daniel Blanco Parla
 * https://github.com/deblanco/xlsExport
 */

type ObjType = {
  [key: string]: string | number | null;
};

class XlsExport {
  // data: array of objects with the data for each row of the table
  // name: title for the worksheet
  constructor(data: ObjType[], title: string = "Worksheet") {
    // input validation: new xlsExport([], String)
    if (
      !Array.isArray(data) ||
      typeof title !== "string" ||
      Object.prototype.toString.call(title) !== "[object String]"
    ) {
      throw new Error("Invalid input types: new xlsExport(Array [], String)");
    }

    this._data = data;
    this._title = title;
  }

  private _data: ObjType[];
  private _title: string;

  set setData(data: []) {
    if (!Array.isArray(data))
      throw new Error("Invalid input type: setData(Array [])");

    this._data = data;
  }

  get getData() {
    return this._data;
  }

  exportToXLS(fileName: string = "export.xls", rtl: boolean = false) {
    if (
      typeof fileName !== "string" ||
      Object.prototype.toString.call(fileName) !== "[object String]"
    ) {
      throw new Error("Invalid input type: exportToCSV(String)");
    }

    const table = this.objectToTable();

    let TEMPLATE_XLS_val = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"/>
    <head><!--[if gte mso 9]><xml>
    <x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${this._title}</x:Name><x:WorksheetOptions>`;

    if (rtl) TEMPLATE_XLS_val = TEMPLATE_XLS_val + `<x:DisplayRightToLeft/>`;

    const computeOutput =
      TEMPLATE_XLS_val +
      `<x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml>
    
    <![endif]--></head>
    <body>${table}</body></html>`;

    const MIME_XLS = "application/vnd.ms-excel;base64,";

    const computedXLS = new Blob([computeOutput], {
      type: MIME_XLS,
    });
    const xlsLink = window.URL.createObjectURL(computedXLS);
    this.downloadFile(xlsLink, fileName);
  }

  public exportToCSV(fileName = "export.csv") {
    if (
      typeof fileName !== "string" ||
      Object.prototype.toString.call(fileName) !== "[object String]"
    ) {
      throw new Error("Invalid input type: exportToCSV(String)");
    }
    const computedCSV = new Blob([this.objectToSemicolons()], {
      type: "text/csv;charset=utf-8",
    });
    const csvLink = window.URL.createObjectURL(computedCSV);
    this.downloadFile(csvLink, fileName);
  }

  public downloadFile(output: string, fileName: string) {
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.download = fileName;
    link.href = output;
    link.click();
    return true;
  }

  public toBase64(data: string) {
    return window.btoa(unescape(encodeURIComponent(data)));
  }

  private objectToTable() {
    // extract keys from the first object, will be the title for each column

    //throw new Error("Invalid input type: exportToCSV(String)");

    const colsHead = `<tr>${Object.keys(this._data[0])
      .map((key) => `<td>${key}</td>`)
      .join("")}</tr>`;

    const makeTd = (data: string | number | null) => {
      return `<td>${data === 0 || data ? data : ""}</td>`;
    };

    const makeTr = (obj: ObjType) => {
      const keys = Object.keys(obj);

      const data = keys
        .map((col) => {
          const _dataCol = obj[col];
          return makeTd(_dataCol);
        })
        .join("");
      return `<tr>${data}</tr>`;
    };

    const colsData = this._data
      .map((obj) => makeTr(obj)) // 'null' values not showed but zero value is showed
      .join("");

    return `<table>${colsHead}${colsData}</table>`.trim(); // remove spaces...
  }

  private objectToSemicolons() {
    const colsHead = Object.keys(this._data[0])
      .map((key) => [key])
      .join(";");
    const colsData = this._data
      .map((obj) => [
        // obj === row
        Object.keys(obj)
          .map((col) => [
            obj[col], // row[column]
          ])
          .join(";"), // join the row with ';'
      ])
      .join("\n"); // end of row

    return `${colsHead}\n${colsData}`;
  }
}

export { XlsExport }; // comment this line to babelize
