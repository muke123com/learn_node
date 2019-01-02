const db = require('../db');

let usersModel = {};

usersModel.getUsers = async () => {
    let sql = 'select * from k_users';
    let users_list = await db.q(sql, []);
    return users_list;
};

module.exports = usersModel;