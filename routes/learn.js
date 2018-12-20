const express = require('express');
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

router.all('*', (req,res,next)=>{
    res.send(req.url);
});

module.exports = router;
