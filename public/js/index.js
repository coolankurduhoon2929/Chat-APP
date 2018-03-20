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

socket.on('newLocationMessage',function(message){
  var li=$('<li></li>');
  var a=$('<a target="_blank">My current Location</a>');
  li.text(`${message.from}: `);
  a.attr('href',message.url);
  li.append(a);
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


var locationButton=$('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(){
    alert('Unable to fetch location');
  });
});
