var xl = require('xlsx');
var fs = require('fs')

// 读表格
function readXls() {

    var args = process.argv.splice(1)
    //workbook 对象，指的是整份 Excel 文档。我们在使用 js-xlsx 读取 Excel 文档之后就会获得 workbook 对象。
    var workbook = xl.readFile(args[1])

    // 获取 Excel 中所有表名
    const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
    // 根据表名获取对应某张表
    const worksheet = workbook.Sheets[sheetNames[0]];

    //返回json数据
    var xlsJson = xl.utils.sheet_to_json(worksheet);

    return xlsJson;
}

function writeJson(data) {
    fs.writeFile('xlsxdata.json', data, function (error) {
        if (error) {
            console.log('Write to json has failed');
        } else {
            console.log('Write to json has successed');
        }
    })
}

writeJson(JSON.stringify(readXls()));