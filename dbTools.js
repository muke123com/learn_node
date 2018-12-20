const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://10.10.22.65:27017';
const dbName = 'mnode';
const client = new MongoClient(url, {
    useNewUrlParser: true,
    auto_reconnect: true,
    poolSize: 10
});

function _connect(callback) {
    client.connect((err)=>{
        assert.equal(null,err);
        console.log("Connected successfully to server");
        callback();
    })
}


let mdb = {
    //查询数据
    find: function (cname,filter,fn) {
        _connect(()=>{
            const col = client.db(dbName).collection(cname);
            col.find(filter).toArray((err,docs)=>{
                fn(err,docs);
            })
        })

    },
    //插入数据
    insert: function (cname,arrData,fn) {
        _connect(()=>{
            const col = client.db(dbName).collection(cname);
            col.insertMany(arrData, function (err,result) {
                fn(err,result);
                client.close();
            })
        })
    },
    //更新数据
    update: function (cname,filter,updated,fn) {
        _connect(()=>{
            const col = client.db(dbName).collection(cname);
            col.updateMany(filter,{$set:updated}, function (err,result) {
                fn(err,result);
                client.close();
            })
        })
    },
    //删除数据
    delete: function (cname,filter,fn) {
        _connect(()=>{
            const col = client.db(dbName).collection(cname);
            col.deleteMany(filter, function (err,result) {
                fn(err,result);
                client.close();
            })
        })
    },
};


// mdb.insert('test01', [{name: 'a1'}, {name: 'a2'}], (err,result)=>{
//     if (err) throw err;
//     console.log(result);
// });
// mdb.update('test01', {name: 'a1'},{name:'a5'}, (err,result)=>{
//     if (err) throw err;
//     console.log(result);
// });
// mdb.find('test01', {name: 'a1'}, (err,result)=>{
//     if (err) throw err;
//     console.log(result);
// });
// mdb.delete('test01', {name: 'a5'}, (err,result)=>{
//     if (err) throw err;
// });

module.exports = mdb;