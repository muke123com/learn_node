cons fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec)

async function lsExample() {
    const { stdout, stderr } = await exec('ls');
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
}

function uFormat() {
    let s1 = util.format('%s+%s=%s', '1', '2', '3')
    let s2 = util.format('%j', {'name': 'abc'})
    console.log(s1);
    console.log(s2);
}


// lsExample();
uFormat();