const express=require('express')
const app=express()
const cors =require('cors')
const mongoose=require('mongoose')
const authRoutes=require('./Routes/authRoutes')
const cookieParser=require('cookie-parser')


app.listen(3000, () => {
  console.log('app is running');
});

mongoose.connect('mongodb://localhost:27017/jwt',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('DB connect succesfully');
}).catch(err=>{
    console.log(err.message);
})
app.use(
    cors({

    origin:["http://localhost:3001"],
    method:["GET","POST"],
    credentials:true,
     exposedHeaders: ['Authorization'] 
    
})
)

app.use(cookieParser())
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

app.use('/',authRoutes)