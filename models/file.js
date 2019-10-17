const fs = require('fs');
const path = require('path');
const uploadPath = path.join(__dirname, '../upload/');
let file = {};

file.isDir = function(filePath) {
    return fs.statSync(filePath).isDirectory();
}

file.isFile = function(filePath) {
    return fs.statSync(filePath).isFile();
}
/**
 * 上传图片
 * @file 文件数据
 */
file.uploadBanner = function(file) {
    const reader = fs.createReadStream(file.path);
    const fileType = file.name.split(".").pop();
    const name = 'banner_' + new Date().getTime() + '.' + fileType;
    const filePath = uploadPath + name;
    const upStream = fs.createWriteStream(filePath)
    reader.pipe(upStream);
    return name;
}

/**
 * 根据图片名字获取图片
 * @name 图片名
 */
file.getImgByName = function(name) {
    console.log(name);
    return fs.createReadStream(uploadPath + name);
}

/**
 * 获取所有上传的图片
 * 
 */
file.getUploadImgs = function() {
    return fs.readdirSync(uploadPath);
}

module.exports = file;