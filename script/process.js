process.stdout.write("www\n");

// 通过参数读取
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});
// 获取执行路径
console.log(process.execPath);

// 平台信息
console.log(process.platform);

// 输出当前目录
console.log('当前目录: ' + process.cwd());

// 输出当前版本
console.log('当前版本: ' + process.version);

// 输出内存使用情况
console.log(process.memoryUsage());