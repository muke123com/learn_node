const db = require('../db');

let jsonsModel = {};

jsonsModel.getTableList = async () => {
    let sql = `show tables`;
    return await db.q(sql, []);
};

jsonsModel.getJsons = async (table) => {
    let sql = `select * from ${table}`;
    return await db.q(sql, []);
};

module.exports = jsonsModel;