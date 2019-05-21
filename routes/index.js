var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/video1', function(req, res, next) {

  let path = './assets/sintel.mp4';
  let stat = fs.statSync(path);
  let fileSize = stat.size;

  let head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4'
  };
  //需要设置HTTP HEAD
  res.writeHead(200, head);

  fs.createReadStream(path)
      .pipe(res);

});

module.exports = router;
