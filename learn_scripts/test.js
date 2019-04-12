const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
console.log(numCPUs);
console.log(cluster.isMaster);