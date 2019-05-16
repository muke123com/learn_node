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
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            "cookie": "EPIC_SESSION_GRAPHQL=XQueGURVL4P4TpLxuYQmyg.pH_qoEEiH1IyWFIPOUJjjfpGVzNXp6lNfW0fRJm4bPGB-v-I-Wh8OmvAwyg90cwb.1557990060207.86400000.jZLLpyzeGVSHV3nwnrAPJgMytAOH_nF7SMiP7qpQps4"
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
