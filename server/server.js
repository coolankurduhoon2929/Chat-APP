const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');
const {generateMessage}=require('./utils/message');

publicpath=path.join(__dirname+'/../public');
const port=process.env.PORT || 3000;

var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicpath));

io.on('connection',(socket)=>{
  console.log("New user connected");
  socket.emit('newMessage',generateMessage('Admin','Welcom to chat App'));
  socket.broadcast.emit('newMessage',generateMessage('Admin','new User joined'));

  // socket.emit('newMessage',{
  //   from:'Kaal',
  //   text:'Hello How are you?',
  //   createdAt:123
  // });

  socket.on('createMessage',(message,callback)=>{
    console.log("Message",message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('This is from the server');
    // socket.broadcast.emit('newMessage',{
    //   from:message.from,
    //   text:message.text,
    //   createdAt:new Date().getTime()
    // });
  });

  socket.on('disconnect',()=>{
    console.log("User Disconnected");
  });
});

server.listen(port,()=>{
  console.log(`Server is up on port ${port}...`);
});
