const cluster = require('cluster')
const numCPUs = require('os').cpus().length;
function fibonacci(n) {
    return n === 0
        ? 0
        : n === 1
            ? 1
            : fibonacci(n - 1) + fibonacci(n - 2)
}
const seqArr = [42, 43, 42, 40]

if (cluster.isMaster) {
    let endTaskNum = 0;
    console.time('main')
    console.log(`[Master]# 主进程开始运行`)

    for (let i = 0; i < numCPUs; i++) {
        // 触发进程
        const worker = cluster.fork();
        worker.send(seqArr[i])
    }

    cluster.on('message', (worker, message, handle) => {
        console.log(`[Master]# 进程 ${worker.id}: ${message}`)

        endTaskNum++
        if (endTaskNum === numCPUs) {
            console.timeEnd('main')
            cluster.disconnect()
        }
    })
    cluster.on('exit', (worker, code, signal) => console.log(`[Master]# 进程 ${worker.id} 关闭.`))
} else {
    process.on('message', seq => {
        let taskId = process.pid;
        console.log(`[Worker]# 任务 ${taskId} 开始计算`);
        const start = Date.now()
        const result = fibonacci(seq)
        console.log(`[Worker]# 任务 ${taskId} 的结果是 ${result}, 花费时间 ${Date.now() - start} ms。`)
        process.send('任务结束')
    })
}


// function calculate (seq, taskId) {
//     return new Promise((resolve, reject) => {
//         console.log(`任务 ${taskId} 开始计算`);
//         const start = Date.now()
//         const result = fibonacci(seq)
//         console.log(`任务 ${taskId} 的结果是 ${result}, 花费时间 ${Date.now() - start} ms。`)
//         return resolve(result);
//     })
// }

// (async () => {
//     console.time('main')
//     const results = await Promise.all(seqArr.map(calculate))
//     console.timeEnd('main')
// })()