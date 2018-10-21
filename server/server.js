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
    socket.emit('newMessage',{
        from :"sid",
        text:"yo bro"
    })

    socket.on('createMessage',(message)=>{
        console.log(message)
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
})
server.listen(PORT,()=>{console.log(`server running on ${PORT}`)})