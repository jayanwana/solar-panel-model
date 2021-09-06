import { nanoid } from 'nanoid';
import normalizeEmail from 'validator/lib/normalizeEmail';

/* function to search database for user by user_id
params: db: an instance of the connected databse Object
userId: Id of the user, string
return: user object or null if user not found
*/
export async function findUserById(db, userId) {
  return db.collection('users').findOne({
    _id: userId,
  }).then((user) => user || null);
}

/* function to Search database for user by user_email
params: db: an instance of the connected databse Object
email: the email of the user searched for, string
return: user object or null if user not found
*/
export async function findUserByEmail(db, email) {
  email = normalizeEmail(email);
  return db.collection('users').findOne({
    email,
  }).then((user) => user || null);
}

/* function to update the user object on the database
params: db: an instance of the connected databse Object
id: Id of the user, string
update: updated user data object
return: updated user object
*/
export async function updateUserById(db, id, update) {
  return db.collection('users').findOneAndUpdate(
    { _id: id },
    { $set: update },
    { returnOriginal: false },
  ).then(({ value }) => value);
}

/* function insert a new user instance in the database.
It sets the schema for the user database
params: db: an instance of the connected databse Object
data: user data object
return: new user object
*/
export async function insertUser(db, {
  email, password, name, userType,
}) {
  return db
    .collection('users')
    .insertOne({
      _id: nanoid(12),
      emailVerified: false,
      userType,
      email,
      password,
      name,
    })
    .then(({ ops }) => ops[0]);
}
