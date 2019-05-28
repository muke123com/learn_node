const usersModel = require('../../models/users');

class UserController {
    static async login(ctx, next) {
        let username = ctx.request.body.username;
        let password = ctx.request.body.password;

        let res = await usersModel.login(username, password);

        ctx.body = res;
    }

    static async register(ctx, next) {
        let username = ctx.request.body.username;
        let password = ctx.request.body.password;
        let res = await usersModel.register(username, password);

        ctx.body = res;
    }
}

module.exports = UserController;