const db = require('../db');
const fs = require('fs');
const path = require('path');
const jsDataPath = path.join(__dirname, '../jsonData/');
let jsonsModel = {};
jsonsModel.jsonToData = async (name) => {
    let res = fs.readFileSync(path.join(jsDataPath, name));
    // let r = fs.readdirSync(jsDataPath);
    // console.log(r);
    let data = JSON.parse(res)['RECORDS'];
    let keys = Object.keys(data[0]);
    // console.log(keys);
    let values = '';
    data.map((item) => {
        let s;
        for (var key in item) {
            s += '"'+escape(item[key])+'",'
        }
        s = s.substring(0,s.length-1);
        values += "(" + s + "),";
    })
    values = values.substring(0,values.length-1);
    let table;
    if(name == 'ciauthor.json') {
        table = 'ciauthor';
    } else if ('ci.json') {
        table = 'ci';
    }
    values = values.replace(/\s/g, '');
    let sql = `insert into ${table} values ${values}`;
    sql = sql.replace(/undefined/g, '')
    
    let ss = await db.q(sql, []);
    console.log(ss);
}

// jsonsModel.jsonToData('ciauthor.json');
jsonsModel.jsonToData('ci.json');