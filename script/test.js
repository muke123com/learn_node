console.log(process.env); 
const glob = require('glob')

glob('routes/*.js', (err, files) => {
  console.log(files);
})
