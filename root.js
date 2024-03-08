const express=require('express');
const app=express();
const path=require('path');
const logger=require('./middleware/logger');


app.use(express.json());
//initialization of middle ware which allow us to use function expression
app.use(logger);

//let's change pub;lic folder to static folder
app.use(express.static(path.join(__dirname,'public')));

app.get("/",(request,response)=>{
   // response.status(200).sendFile(path.join(__dirname,'public','index.html'));
});

app.use("/api/members",require('./routes/api/member'));

//port
const PORT=process.env.PORT || 5000;


//start server on port 5000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT} ....`);
});