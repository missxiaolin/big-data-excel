// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import XLSX from "xlsx";
// eslint-disable-next-line import/no-extraneous-dependencies
import Mock from "mockjs";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FileSaver = require("file-saver");

/**
 * 将 创建指定数量的数据（模拟后端接口）
 * @param limit
 * @returns data
 */
const getData = async (limit) => {
  return new Promise((resolve, reject) => {
    try {
      const { Random } = Mock;

      // 创建指定个数的随机数据
      const data = new Array(limit).fill("").map((_, index) => {
        return {
          id: `202207-${index}`,
          username: Random.cname(),
          url: Random.url("https"),
          price: Random.float(0, 210000, 0, 2),
          createAt: Random.datetime("yyyy-MM-dd HH:mm:ss"),
        };
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
// 导出数据为 CSV 格式
// eslint-disable-next-line @typescript-eslint/no-empty-function
const exportCsv = async (total = 0, size = 1000, onProcess = () => {}) => {
  try {
    // eslint-disable-next-line no-throw-literal
    if (!total) throw "无数据";
    // 分片
    const step = Math.ceil(total / size);
    // CSV 缓存
    const cvsArray = [];
    // 创建表头[一般表头由外部传入]
    cvsArray.push(`${["id", "用户名", "网站", "报价", "时间"].join()}\n`);
    // 遍历分片
    // eslint-disable-next-line no-plusplus
    console.time("导出时间");
    for (let i = 0; i < step; i++) {
      // eslint-disable-next-line no-await-in-loop, no-async-promise-executor
      await new Promise(async (resolve, reject) => {
        try {
          // 创建指定个数的随机数据
          const data = await getData(size);
          // 格式化为 CSV 字符串
          // eslint-disable-next-line array-callback-return
          data.map((row) => {
            cvsArray.push(`${Object.values(row).join()}\n`);
            // cvsArray.push(`row`);
          });
          // 统计进度
          const process = (i / step) * 100;
          console.log(`进度 ${Math.round(process)}%`);
          onProcess(process);
          // 适当暂停，避免页面无法执行渲染
          await new Promise((_resolve) => {
            requestAnimationFrame(() => _resolve(true), 0);
          });
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    }
    // 遍历完成时，固定进度为 100%
    onProcess(100);
    const blob = new Blob([String.fromCharCode(0xfeff), ...cvsArray], {
      type: "text/plain;charset=utf-8",
    });
    console.timeEnd("导出时间");
    await FileSaver.saveAs(blob, "dawei.csv");
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};
/**
 * 将 file 转为一个 CSF 的 JSON
 * @param {File} file
 * @returns sheets
 * FileReader 是异步读取方法，所以这里和 Promise 结合使用
 */
const analyseExcelToJson = (file) => {
  return new Promise((resolve, reject) => {
    if (file instanceof File) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        const options = { type: "array" };
        const workbook = XLSX.read(arrayBuffer, options);

        const sheetNames = workbook.SheetNames;
        const result = sheetNames.map(
          (sheetName) => workbook.Sheets[sheetName]
        );
        console.log("analyseExcelToJson===onloadend", result);
        resolve(result);
      };
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error("入参不是 File 类型"));
    }
  });
};
// 查看中文api手册 https://github.com/rockboom/SheetJS-docs-zh-CN
const generateExcelBySheet = (sheet) => {
  console.log("generateExcelBySheet---sheet", XLSX.utils.sheet_to_json(sheet));
  return XLSX.utils.sheet_to_json(sheet);
};

/**
 * 将 CSF 格式的 sheet数组导出 excel 文件
 * @param {Array} sheets sheet的集合
 * @param {String} fileName 下载时文件名称   导出excel文件
 */
const exportExcelBySheets = (sheets, fileName = "dawei.xlsx") => {
  const SheetNames = [];
  const Sheets = {};
  const workbook = { SheetNames, Sheets };

  sheets.forEach((sheet, i) => {
    const name = `sheet${i + 1}`;
    SheetNames.push(name);
    Sheets[name] = sheet;
  });
  // writeFileAsync
  XLSX.writeFileAsync(fileName, workbook, { type: "binary" }, () => {
    console.log("导出完成");
  });
  // return XLSX.writeFile(workbook, fileName, { type: 'binary' });
};

/**
 * 将二维数组的 sheet 数据导出 Excel 文件
 * @param {Array} workSheetData 二维数组
 * @param {String} fileName 下载时文件名称
 */
const exportExcelByDoubleDimensArray = (
  workSheetData,
  fileName = "example.xlsx"
) => {
  const ws = XLSX.utils.aoa_to_sheet(workSheetData);
  const workSheetName = "MySheet";
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, ws, workSheetName);
  return XLSX.writeFile(workbook, fileName, { type: "binary" });
};

/**
 * 将 table 转换成 Excel 导出
 * @param {*} el table 的根 dom 元素
 * @param {*} fileName 下载时文件名称
 */
const excelExportByTable = (el, fileName = "dawei.xlsx") => {
  if (!el) {
    throw new Error("没有获取到表格的根 dom 元素");
  }
  const options = { raw: true };
  const workbook = XLSX.utils.table_to_book(el, options);

  return XLSX.writeFile(workbook, fileName, { type: "binary" });
};

export {
  exportCsv,
  analyseExcelToJson,
  exportExcelBySheets,
  generateExcelBySheet,
  exportExcelByDoubleDimensArray,
  excelExportByTable,
};
