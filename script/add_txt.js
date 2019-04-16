const fs = require('fs');
const all = 1000;
let num = 0;
for(let i = 0; i < all; i++){
    let text = Math.random()
    fs.writeFile('./books/'+ i + '.txt', text, function(err) {
        if (err) throw err
        num++;
    })
}
