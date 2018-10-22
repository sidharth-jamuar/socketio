var socket= io();
socket.on('connect',()=>{
    console.log("connected to server")
  
})
socket.on('disconnect',()=>{
    console.log("disconnected from server")
})
socket.on('newMessage',(message)=>{
    console.log("new message",message)
    var li=jQuery('<li></li>')
    li.text(`${message.from} ${message.text}`)
    jQuery('#messages').append(li)
})
jQuery('#firstform').on('submit',(e)=>{
    e.preventDefault();
    socket.emit('createMessage',{
        from:"User",
        text:jQuery('[name=message]').val()
    },()=>{
        console.log("call back function")
    })
})
var sendLocation=jQuery('#send-location')
sendLocation.on('click',()=>{
    if(!navigator.geolocation){
       return alert("geolocation not supported")
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)
        socket.emit('createLocation',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        }
        )
    },()=>{return alert("unable to fetch location")})
})