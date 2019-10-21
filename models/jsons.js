const db = require('../db');
const fs = require('fs');
const path = require('path');
const jsDataPath = path.join(__dirname, '../jsonData/');

let jsonsModel = {};

jsonsModel.getTableList = async () => {
    let sql = `show tables`;
    return await db.q(sql, []);
};

jsonsModel.getJsons = async (table) => {
    let sql = `select * from ${table}`;
    return await db.q(sql, []);
};
// 读取jsonData目录中的json数据
jsonsModel.readJsonData = async (name) => {
    let res = fs.readFileSync(path.join(jsDataPath, name));
    return res;
}

module.exports = jsonsModel;