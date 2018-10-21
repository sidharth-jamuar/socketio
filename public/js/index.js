var socket= io();
socket.on('connect',()=>{
    console.log("connected to server")
    socket.emit('createMessage',{from :"sid",
    text:"yeah"})
})
socket.on('disconnect',()=>{
    console.log("disconnected from server")
})
socket.on('newMessage',(message)=>{
    console.log("new message",message)
})