const fs = require('fs');
const path = require('path');
let file = fs.readFileSync(path.join(__dirname, '1.jpg'))

let b64 = Buffer.from(file).toString('base64')

fs.writeFileSync(path.join(__dirname, '1.txt'), b64);
