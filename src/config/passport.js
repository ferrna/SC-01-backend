const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Users } = require("../db");
const validPassword = require("../lib/passwordUtils").validPassword;

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

const verifyCallback = (username, password, done) => {
  Users.findOne({ where: { username } })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
  //          saved to session:
  //          request.session.passport.user = {id: '..'}
});

passport.deserializeUser((id, done) => {
  Users.findOne({ where: { id } }).then((user) => {
    done(null, user);
    //         user object attaches to the request as request.user
  }).catch((err) => {
    done(err, null);
  })
});

/* 
The user id (you provide as the second argument of the done function) is saved in the session and is later
used to retrieve the whole object via the deserializeUser function.

serializeUser determines which data of the user object should be stored in the session. The result of the
serializeUser method is attached to the session as req.session.passport.user = {}. Here for instance,
it would be (as we provide the user id as the key) req.session.passport.user = {id: 'xyz'}

We are calling passport.deserializeUser right after it where does it fit in the workflow?
The first argument of deserializeUser corresponds to the key of the user object that was given to the done
function (see 1.). So your whole object is retrieved with help of that key. That key here is the user id
(key can be any key of the user object i.e. name,email etc). In deserializeUser that key is matched with
the in memory array / database or any data resource.

The fetched object is attached to the request object as request.user 
*/