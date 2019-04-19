const fs = require('fs');

let file = {};

file.isDir = function(filePath) {
    return fs.statSync(filePath).isDirectory();
}

file.isFile = function(filePath) {
    return fs.statSync(filePath).isFile();
}

module.exports = file;