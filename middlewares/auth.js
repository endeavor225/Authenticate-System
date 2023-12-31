const passport = require('passport')
const passportJWT = require('passport-jwt')
const User = require('../model/model')

passport.use(
    new passportJWT.Strategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "SECRET_KEY",
    },
        function(jwtPayload, done){
            return User.findById(jwtPayload.id)
            .then(user => {
                return done(null, user)
            })
            .catch(err => {
                return done(err)
            })
        }
    )
)