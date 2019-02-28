// //test1 同步
// const seqArr = [40,40,40,40];
//
// function fibonacci(n) {
//     return n === 0 ? 0 : n === 1 ? 1 : fibonacci(n-1) + fibonacci(n-2)
// }
//
// function calculate(seq, taskId) {
//     return new Promise((resolve, reject) => {
//         console.log(`任务 ${taskId} 开始`)
//         const start = Date.now();
//         const result = fibonacci(seq);
//         console.log(`任务 ${taskId} 结果是 ${result}，花费${Date.now() - start}ms`);
//         return resolve(result);
//     })
// }
//
// (async function main() {
//     console.log('--------------同步------------------');
//     console.time('main');
//     const results = await Promise.all(seqArr.map(calculate));
//     console.timeEnd('main')
// })();

//test2 cluster
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
console.log(numCPUs);

function fibonacci(n) {
    return n===0?0:n===1?1:fibonacci(n-1)+fibonacci(n-2)
}

if(cluster.isMaster) {
    const seqArr = [40,40,40,40];
    let endTaskNum = 0;

    console.time('main');
    console.log(`[Master]# 主进程开始. pid: ${process.pid}`);

    for (let i=0;i<numCPUs;i++) {
        const worker = cluster.fork();
        worker.send(seqArr[i]);
    }
    cluster.on('message', (worker, message, handle) => {
        console.log(`[Worker]# 工作进程 ${worker.id} 开始: ${message}`)
        endTaskNum++;
        if(endTaskNum === 4){
            console.timeEnd('main');
            cluster.disconnect();
        }
    });
    cluster.on('exit', (worker,code,signal) => console.log(`工作进程 ${worker.id} 结束`))
} else {
    process.on('message', seq => {
        console.log(`[Worker]#  开始计算。。。`);
        const start = Date.now();
        const result = fibonacci(seq);
        console.log(`[Worker]# 任务 ${process.pid} 的结果是 ${result}, 花费 ${Date.now() - start} ms`);
        process.send('任务结束')
    })
}