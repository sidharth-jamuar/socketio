const path=require('path')
const publicPath=path.join(__dirname,'../public')
const http=require('http')
const socketIO=require('socket.io')
const express=require('express');
const {generateMessage}=require('./utils/message')
const app=express();
var server =http.createServer(app)
var io=socketIO(server)
const PORT=process.env.PORT || 3000
app.use(express.static(publicPath))

io.on('connection',(socket)=>{
    console.log('new user connected')
   
    //for one user that joined 
    // socket.emit('newMessage',{
    //     from:"Admin",
    //     text:"Welcome to the chat app",
    //     createdAt:new Date().getTime()
    // })
    socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'))
    //for alerting other users other than the one who joined by using
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'))
    socket.on('createMessage',(message,callback)=>{
        console.log(message)
        io.emit('newMessage',generateMessage(message.from,message.text))
        // socket.broadcast.emit('newMessage',{
        //     from :message.from,
        //     text:message.text,
        //     createdAt:new Date().getTime()
        // })
         callback()
    })
    socket.on('createLocation',(coords)=>{
        io.emit('newMessage',generateMessage('Admin',`${coords.latitude} ${coords.longitude}`))
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
})
server.listen(PORT,()=>{console.log(`server running on ${PORT}`)})