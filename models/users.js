const db = require('../db');
const Jwt = require('../models/jwt');
const showAjax = require('./showAjax')

let usersModel = {};
let table = 'm_user';

usersModel.login = async (username, password) => {
    let sql = `select id, name, password from ${table} where name = '${username}'`
    let user = await db.q(sql, []);
    if(user.length == 0) {
        return showAjax(0, '当前用户名不存在')
    }else if(password != user[0].password) {
        return showAjax(0, '密码错误')
    }else{
        let id = user[0].id;
        let jwt = new Jwt(id);
        let token = jwt.generateToken();
        return showAjax(1, '登录成功', {
            username: username,
            token: token
        })
    }
}

usersModel.register = async (username, password) => {
    let findsql = `select count(id) as num from ${table} where name = '${username}'`
    let user = await db.q(findsql, []);
    if(user[0]['num'] != 0) {
        return showAjax(0, '当前用户名已存在')
    }else{
        let insertSql = `insert into ${table} (name, password) values (${username}, ${password})`
        let res = await db.q(insertSql, []);
        console.log(res);
        return showAjax(1, '注册成功')
    }
}

usersModel.getUsers = async () => {
    let sql = 'select * from ${table}';
    let users_list = await db.q(sql, []);
    return users_list;
};

module.exports = usersModel;