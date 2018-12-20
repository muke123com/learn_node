const express = require('express');
const path = require('path');
const formidable = require('formidable');
const db = require('./../dbTools');

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/json', (req, res, next) => {
    res.json([{'name':'123'}])
});
router.get('/redirect', (req, res, next) => {
    res.redirect('http://www.quandashi.com');
});
router.get('/download', (req, res, next) => {
    res.download('./app.js')
});
router.get('/jsonp', (req, res, next) => {
    res.jsonp('aa')
});

router.get('/form', function(req, res, next) {
    db.find('test01', {}, (err, result)=>{
        if(err) throw err;
        res.render('form', { title: '表单提交', list:result });
    });

});

router.post('/submit', function(req, res, next) {
    let form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../public', 'images');  //上传目录
    form.keepExtensions = true;  //保留原有后缀名
    form.parse(req, function(err, fields, files) {
        let name = fields.name;
        let age = fields.age;
        let filename = path.parse(files.file.path).base;
        db.insert('test01',[{name,age,filename}],(err,result)=>{
            if(err) throw err;
            res.redirect('form')
        });

    });
});

// router.all('*', (req,res,next)=>{
//     res.send(req.url);
// });

module.exports = router;
