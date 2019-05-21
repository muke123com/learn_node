const router = require('koa-router')();
const fs = require('fs');
const path = require('path')

const Jsons = require('../models/jsons');

router.prefix('/files');

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
});
// 获取当前数据库所有表
router.get('/getTableList', async (ctx, next) => {
    ctx.body = await Jsons.getTableList();
});
// 将表数据转为json和小程序数据库json数据
router.get('/getJson', async (ctx, next) => {
    let query = ctx.query;
    let tableName = query.table?query.table:'poets';
    let res = await Jsons.getJsons(tableName);
    fs.writeFile('../jsonData/' + tableName + '.json', JSON.stringify(res), (err)=>{
        console.log("数据写入成功！");
    });
    let db_json = '';
    res.map((item) => {
        db_json += JSON.stringify(item) + '\n';
    });

    fs.writeFile('../jsonData/db_' + tableName + '.json', db_json, (err)=>{
        console.log("db数据写入成功！");
    });

    ctx.body = res[0];
});
//读取大文件视频

/**
 * 通过流将视频发给客户端
 */
router.get('/video1', async (ctx, next) => {
    let res = ctx.res;
    let req = ctx.req;

    let fPath = path.join("./assets/sintel.mp4")
    let stat = fs.statSync(fPath);
    let fileSize = stat.size;

    let head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4'
    };
    //需要设置HTTP HEAD
    res.writeHead(200, head);

    fs.createReadStream(fPath)
        .pipe(res);
});

router.get('/video', async (ctx, next) => {
    let res = ctx.res;
    let req = ctx.req;

    let fPath = path.join("D:\\site\\learn_electron\\files\\video", "1.mp4")
    let stat = fs.statSync(fPath);
    let fileSize = stat.size;
    let range = req.headers.range;

    if (range) {
        //有range头才使用206状态码

        let parts = range.replace(/bytes=/, "").split("-");
        let start = parseInt(parts[0], 10);
        let end = parts[1] ? parseInt(parts[1], 10) : start + 999;

        // end 在最后取值为 fileSize - 1 
        end = end > fileSize - 1 ? fileSize - 1 : end;

        let chunksize = (end - start) + 1;
        let file = fs.createReadStream(fPath, { start, end });
        let head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        let head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(fPath).pipe(res);
    }
});

module.exports = router