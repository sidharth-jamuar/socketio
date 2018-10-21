const path=require('path')
const publicPath=path.join(__dirname,'../public')
const http=require('http')
const socketIO=require('socket.io')
const express=require('express');
const app=express();
var server =http.createServer(app)
var io=socketIO(server)
const PORT=process.env.PORT || 3000
app.use(express.static(publicPath))

io.on('connection',(socket)=>{
    console.log('new user connected')
   
    socket.on('createMessage',(message)=>{
        console.log(message)
        io.emit('newMessage',{
            from :message.from,
            text:message.text,
            createdAt:new Date().getTime()
        })
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
})
server.listen(PORT,()=>{console.log(`server running on ${PORT}`)})