const request = require('request');

const db = require('../db');
const Jwt = require('../models/jwt');
const showAjax = require('./showAjax');

let spiderModel = {};
let table = 'm_';

spiderModel.getData = async () => {
    let url = "https://graphql.epicgames.com/graphql";
    // let url = "http://localhost:3000/test";
    let query = "";
    let data = {};
    data['query'] = query;
    data['variables'] = { "namespace": "epic", "country": "US" };

    let options = {
        url: url,
        headers: {
            'cache-control': 'no-cache',
            Connection: 'keep-alive',
            'content-length': '1531',
            'accept-encoding': 'gzip, deflate',
            cookie: 'EPIC_SESSION_GRAPHQL=z82cV2PBOZNFXsOGzWTKjg.4GPyiT_EI9FsN55j6L2h6KHMNtgtKHBPRhEKBF-heSIrERA8zM2Zxycg8GUFiOfu.1558001546284.86400000.J6HGciVMr_nRxMGmZOqyWeK7d_jr1smBFpPyEJOB6OI',
            Host: 'graphql.epicgames.com',
            'Postman-Token': 'e7e7eb75-0fef-4a28-8d3b-235c67370432,31ea3a81-d997-4439-8172-30b6b27a6375',
            'Cache-Control': 'no-cache',
            Accept: '*/*',
            'User-Agent': 'PostmanRuntime/7.11.0',
            'Content-Type': 'application/json'
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
