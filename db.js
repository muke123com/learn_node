const mysql      = require('mysql');
const pool   = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'm_test'
});

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

let db = {};

db.q = function (sql, params) {
    return new Promise((resolve,reject)=>{
        pool.getConnection(function (err, connection) {
            if(err) {
                reject(err);
                return;
            }
            connection.query(sql, params, function (error, results, fields) {
                console.log(`${sql}=>${params}`);
                connection.release();
                if(error){
                    reject(error);
                    return;
                }
                resolve(results);
            })
        })
    })
};

module.exports = db;

