import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserById, findUserByEmail } from '@/db/index';

// serialize user by user ID
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// get user data from db using user ID
passport.deserializeUser((req, id, done) => {
  findUserById(req.db, id).then((user) => done(null, user), (err) => done(err));
});

// Create local strategy for authentication users with email and password
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      // Find user in database
      const user = await findUserByEmail(req.db, email);
      // Compare password and return user if password is correct
      if (user && (await bcrypt.compare(password, user.password))) done(null, user);
      else done(null, false, { message: 'Email or password is incorrect' });
    },
  ),
);

export default passport;
