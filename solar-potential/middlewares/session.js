import session from 'express-session';
import connectMongo from 'connect-mongo';

// This is used to store sessions in the database for session management
const MongoStore = connectMongo(session);

/* This middleware function manages sessions.
params req: an instance of the requaest object,
res: an instance of the response object,
next: the next middleware function.
returns a session object */
export default function sessionMiddleware(req, res, next) {
  const mongoStore = new MongoStore({
    client: req.dbClient,
    stringify: false,
  });
  return session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
  })(req, res, next);
}
