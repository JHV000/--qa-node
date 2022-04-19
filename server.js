const http = require('http');
const path = require('path');
const express = require('express');
require('./nlp/index')
let roomList = []
let num = 0
//创建一个应用，注意app其实就是一个函数，类似function(req, res) {}
let app = express();
//创建一个http服务器，既然app是一个函数，那这里就可以传入。
let server = http.createServer(app);
//注意，websocket的握手是需要依赖http服务的，所以这里要把server传入进去。
let io = require('socket.io')(server, {
    cors: true
});


//有新的客户端连接时触发
io.on('connection', function (socket) {
    console.log("communicating connected!!!");
    console.log("——————————————————————————");
    //创建房间
    socket.on("createRoom", function (data) {
        let roomName = "房间" + num++;
        roomList.push(roomName)
        socket.join(roomName); // join(房间名)加入房间
        socket.emit('joinInfo',{msg:`加入${roomName}成功`,username:data.username,roomname:roomName})
    });
    //返回房间
    // socket.on("findRoom", function (data) {
       
    // });
    socket.emit('returnRoom',{roomList:roomList})
    //加入房间
    socket.on("joinRoom", function (data) {
        socket.join(data.roomName); // join(房间名)加入房间
        socket.emit('joinInfo',{msg:`加入${data.roomName}成功`,username:data.username,roomname:data.roomName,code:200})
    });
    //退出 离开房间
    socket.on("leaveRoom", function (data) {
        socket.leave(data.roomName); //leave(房间名) 离开房间
        
    });
    //监听客户端发送的 sendMsg 事件
    socket.on("sendMsg", function (data) {
        // data 为客户端发送的消息，可以是 字符串，json对象或buffer
        // 使用 emit 发送消息，broadcast 表示 除自己以外的所有已连接的socket客户端。
        // to(房间名)表示给除自己以外的同一房间内的socket用户推送消息
        socket.broadcast.to(data.roomName).emit("receiveMsg", data);

    })

    //接收数据
    socket.on('communicating', function (obj) {
        console.log(obj);
        // 发送数据
        socket.broadcast.to(obj.roomname).emit('sendAll', obj);

    });
    socket.on('error', function (err) {
        console.log(err);
    });
});

server.listen(8888);