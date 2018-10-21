const path=require('path')
const publicPath=path.join(__dirname,'../public')
const express=require('express');
const app=express();
const PORT=process.env.PORT || 3000
app.use(express.static(publicPath))
app.listen(PORT,()=>{console.log(`server running on ${PORT}`)})