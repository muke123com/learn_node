const router = require('koa-router')();
const fs = require('fs');
const koaBody = require('koa-body')
const showAjax = require('../models/showAjax')
const FileModel = require('../models/file')

router.prefix('/upload');

router.use(koaBody({
    multipart: true,
    formidable: {
        maxFieldsSize: 200 * 1024 * 1024
    }
}))

//文件上传
router.post('/', async (ctx, next) => {
    const file = ctx.request.files.file;
    console.log(ctx.request.files);
    let res = FileModel.uploadBanner(file);
    ctx.body = showAjax(1, "上传成功", res);
})

// 获取上传图片
router.get('/getUploadImgs', async (ctx, next) => {
    let res = FileModel.getUploadImgs();
    ctx.body = showAjax(1, "获取成功", res);
})

module.exports = router