const passport = require('passport');
const GoogleStrategey = require('passport-google-oauth20');
const user = require('../Models/Users');
require('dotenv').config();

passport.serializeUser(function(user, done) {
   console.log('thsi is serializer user id  '+user.id);
   done(null, user.id);
});

passport.deserializeUser(function(id, done) {

   user.findById(id).then((user)=>{
      console.log('thsi is deserializer user  '+user);
      done(null, user);
   })
});

passport.use(new GoogleStrategey({
   clientID:process.env.clientId,
   clientSecret:process.env.clientSecret,
   callbackURL:'/auth/google/redirect'
},(accessToken,refreshToken,profile,done)=>{

   user.findOne({googleID:profile.id}).then((currentUser)=>{
            if(currentUser){
                console.log(`Current User is : ${currentUser}`);
                done(null,currentUser);
            }else{
               new user({
                  Username:profile.displayName,
                  googleID:profile.id,
                  tumbnail:profile._json.picture
               }).save().then(()=>console.log('the New user is created '));
               user.findOne({googleID:profile.id}).then((currentUser)=>{
                  done(null,currentUser);
               })
            }
   });

}))
