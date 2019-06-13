import { Server } from 'ws';
// 定义websocket服务器
const wsServer = new Server({ port: 8085 });



// 定义连接到的websocket集合
let socketSet = new Set<any>();

// 连接
wsServer.on('connection', websocket => {
    socketSet.add(websocket)
    websocket.on('open', () => {
        websocket.send("open")
    })
    
    websocket.on('message', function incoming(data) {
        websocket.send(data);
    });
});

let socketList: any[] = Array.from(socketSet);
socketList.forEach(ws => {
    if (ws.readyState == 1) {
        ws.on('open', () => {
            ws.send("open")
        })
        ws.on('message', function incoming(data: any) {
            ws.send(data);
        });
    } else {
        socketSet.delete(ws);
    }
})

// 初始化消息数
let message = 0;

// 定时2s发送消息
// setInterval(() => {
//     let socketList: any[] = Array.from(socketSet);
//     socketList.forEach(ws => {
//         if (ws.readyState == 1) {
//             ws.send(JSON.stringify({
//                 message: message++,
//                 count: socketList.length
//             }))
//         } else {
//             socketSet.delete(ws);
//         }
//     })
// }, 2000)