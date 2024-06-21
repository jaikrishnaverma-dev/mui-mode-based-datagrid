import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (data: any, title: string) => {
    /**
     * column with definer
     * @param arrayOfArray 
     */
  function fitToColumn(arrayOfArray: any) {
    if (arrayOfArray.length > 0)
      return Object.keys(arrayOfArray[0]).map((headName: any, i: number) => ({
        wch: Math.max(
          ...arrayOfArray.map((a2: any) => {
            return a2?.[headName] && headName.length <= a2[headName].length
              ? a2[headName]?.toString().length
              : headName.length;
          })
        ),
      }));
  }

  if (data.length > 0) {
    const titleRow = [{ [Object.keys(data[0])[0]]: title }];
    const worksheetData = [...titleRow, ...data];
    const worksheet = XLSX.utils.json_to_sheet(worksheetData, {
      skipHeader: true,
    });
    const range = XLSX.utils.decode_range(worksheet["!ref"]!);
    const merge = { s: { r: 0, c: 0 }, e: { r: 0, c: range.e.c } };
    if (!worksheet["!merges"]) worksheet["!merges"] = [];
    worksheet["!merges"].push(merge);
    XLSX.utils.sheet_add_aoa(worksheet, [Object.keys(data[0])], {
      origin: "A2",
    });
    worksheet["!cols"] = fitToColumn(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, "data.xlsx");
  }
};