const router = require('koa-router')();
const fs = require('fs');
const path = require('path')

const Jsons = require('../models/jsons');
const FilesModel = require('../models/file');

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
    let tableName = query.table ? query.table : 'poets';
    let res = await Jsons.getJsons(tableName);
    fs.writeFile('../jsonData/' + tableName + '.json', JSON.stringify(res), (err) => {
        console.log("数据写入成功！");
    });
    let db_json = '';
    res.map((item) => {
        db_json += JSON.stringify(item) + '\n';
    });

    fs.writeFile('../jsonData/db_' + tableName + '.json', db_json, (err) => {
        console.log("db数据写入成功！");
    });

    ctx.body = res[0];
});
//读取大文件视频

/**
 * 通过流将视频发给客户端
 */
const FILE_URL = process.env.FILE_URL || '/home/assets'
let fPath = path.join(FILE_URL, "1.mp4")
// 分片传递大文件
router.get('/video', async (ctx, next) => {
    let fstat = fs.statSync(fPath);
    let fileSize = fstat.size;

    let range = ctx.request.headers.range || null;

    if (range) {
        //有range头才使用206状态码

        let parts = range.replace(/bytes=/, "").split("-");
        let start = parseInt(parts[0], 10);
        let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        let chunksize = (end - start) + 1;
        let file = fs.createReadStream(fPath, { start, end });
        let head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        
        ctx.set(head);
        ctx.status = 206;
        ctx.body = file;

    } else {
        let head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        
        ctx.set(head)
        ctx.status = 200;
        ctx.body = fs.createReadStream(fPath);
    }
});

router.get('/img/:name', async (ctx, next) => {
    let name = ctx.params.name;
    
    ctx.body = FilesModel.getImgByName(name);
    
})

module.exports = router