const request = require('request');

const db = require('../db');
const Jwt = require('../models/jwt');
const showAjax = require('./showAjax');

let spiderModel = {};
let table = 'm_';

spiderModel.getData = async () => {
    // let url = "https://graphql.epicgames.com/graphql";
    let url = "http://localhost:3000/test";
    let query = "";
    let data = {};
    data['query'] = query;
    data['variables'] = { "namespace": "epic", "country": "US" };

    let options = {
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            'Host': "graphql.epicgames.com",
        },
        form: data
    };

    return new Promise((resolve, reject) => {
        request.post(options, function (error, response, body) {
            if (error) {
                reject(error)
            }
            resolve(body);
        })
    })

}

module.exports = spiderModel;
