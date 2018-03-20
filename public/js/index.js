var socket=io();
socket.on('connect',function(){
  console.log("Connected");
  socket.emit('createMessage',{
    from:'Kaal',
    test:'This is a Message...'
  });
});

socket.on('disconnect',function(){
  console.log("Disconnected");
});

socket.on('newMessage',function(message){
  console.log('Message',message);
});
