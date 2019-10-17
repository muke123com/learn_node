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

file.uploadBanner = function(file) {
    const reader = fs.createReadStream(file.path);
    const fileType = file.name.split(".").pop();
    const name = 'banner_' + new Date().getTime() + '.' + fileType;
    const filePath = uploadPath + name;
    const upStream = fs.createWriteStream(filePath)
    reader.pipe(upStream);
    return name;
}

module.exports = file;