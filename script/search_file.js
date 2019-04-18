const path = require('path');
const fs = require('fs');
let filePath = './books';
let key = '啊啊啊';

class FindFile {
    constructor(){
        
    }
    findFolder(filePath){
        if(!fs.existsSync(filePath)){
            console.log('找不到' + filePath);
            return;
        } 
        let files = fs.readdirSync(filePath)
        for (let i = 0; i < files.length; i++) {
            let f = filePath + '/' + files[i];
            if(isDir(f)) {
                this.findFolder(f)
                continue
            }
            if(isFile(f)) {
                this.findFile(f);
            }
        }
    }
    findFile(filePath){
        let text = fs.readFileSync(filePath); 
        text = text.toString();
        if(key != ""){
            if(text.indexOf(key) != -1){
                text = text.replace(new RegExp(key, 'g'), `****${key}****`)
            }
        }
        console.log(text);
    }
}

function isDir(filePath){
    return fs.statSync(filePath).isDirectory();
}

function isFile(filePath){
    return fs.statSync(filePath).isFile();
}

let f = new FindFile();
f.findFolder(filePath);
