const db = require('../db');
const Jwt = require('../models/jwt');
const showAjax = require('./showAjax')

let usersModel = {};
let table = 'm_users';

usersModel.findOne = async (username, password) => {
    let sql = `select muid, musername, mpassword from ${table} where musername = '${username}'`
    let user = await db.q(sql, []);
    if(user.length == 0) {
        return showAjax(0, '当前用户名不存在')
    }else if(password != user[0].mpassword) {
        return showAjax(0, '密码错误')
    }else{
        let id = user[0].muid;
        let jwt = new Jwt(id);
        let token = jwt.generateToken();
        return showAjax(1, '登录成功', {
            username: username,
            token: token
        })
    }
}

usersModel.getUsers = async () => {
    let sql = 'select * from ${table}';
    let users_list = await db.q(sql, []);
    return users_list;
};

module.exports = usersModel;