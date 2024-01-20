const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const passportAuth = require('./config/passport-auth');
var Session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const profileRoutes = require('./routes/profile-routes');

app.use(cors())

app.set("view engine","ejs");

app.use(Session({
         secret:process.env.MYSECRET,
         saveUninitialized: true,
         resave:false,
         cookie:{
          maxAge:24*60*60*1000
         }
       }));
app.use(passport.initialize());
app.use(passport.session());

const connect = async ()=>{
     try{
         await mongoose.connect(process.env.MONGODB);
     }catch(e){
         console.log("ERROR !!! ",e);
     }
}

mongoose.connection.on("connected",()=>{
     console.log("connected");
});

mongoose.connection.on("disconnected",()=>{
     console.log("disconnected");
});


app.use('/auth',authRoutes);
app.use('/profiles',profileRoutes);

app.get('/',(req,res)=>{
     res.render('Home');
})

app.listen(process.env.PORT,()=>{connect();console.log(`server is running on ${process.env.PORT}`)});
