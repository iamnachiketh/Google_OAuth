const route = require('express').Router();
const passport = require('passport');

route.get('/login',function (req,res){
    res.render('Login');
})

route.get('/logout',(req,res)=>{
     req.logOut(()=>console.log('logging out'));
     res.redirect('/');
});

route.get('/google',passport.authenticate('google',{
    scope:["profile"]
}));

route.get('/google/redirect',passport.authenticate('google'), (req, res) => {
    res.redirect('/profiles/');
    //res.send(req.user);
});

module.exports = route;