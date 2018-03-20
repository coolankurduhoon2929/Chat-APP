var socket=io();
socket.on('connect',function(){
  console.log("Connected");
});

socket.on('disconnect',function(){
  console.log("Disconnected");
});

socket.on('newMessage',function(message){
  console.log('Message',message);
  var li=$('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

//Event listener
$('#message-form').on('submit',function(e){
  //prevent page from reloading...
  e.preventDefault();
  //Sending message to server...
  if($('[name=message]').val()!==""){
    socket.emit('createMessage',{
      from:"Akash",
      text:$('[name=message]').val()
    },function(data){
      console.log('Got it',data);
    });
    $('[name=message]').val("");
  }
});
