//  Import all middleware
import nc from 'next-connect';
import passport from 'middlewares/passport';
import database from './database';
import session from './session';

// Initialize instace of next-connect, the api framework
const all = nc();

// Chain all middleware together
all.use(database).use(session).use(passport.initialize()).use(passport.session());

export default all;
