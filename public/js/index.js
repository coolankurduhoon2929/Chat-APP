var socket=io();
socket.on('connect',function(){
  console.log("Connected");
});

socket.on('disconnect',function(){
  console.log("Disconnected");
});

socket.on('newMessage',function(message){
  // console.log('Message',message);
  var formattedTime=moment(message.createdAt).format('h:mm a');
  var li=$('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
  var formattedTime=moment(message.createdAt).format('h:mm a');
  var li=$('<li></li>');
  var a=$('<a target="_blank">My current Location</a>');
  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href',message.url);
  li.append(a);
  $('#messages').append(li);
});

//Event listener
$('#message-form').on('submit',function(e){
  //prevent page from reloading...
  e.preventDefault();
  var messageTextbox=$('[name=message]');
  //Sending message to server...
  if(messageTextbox.val()!==""){
    socket.emit('createMessage',{
      from:"Akash",
      text:messageTextbox.val()
    },function(){
      messageTextbox.val("");
    });
  }
});


var locationButton=$('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled','disabled').text('Sending Location...');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  });
});
