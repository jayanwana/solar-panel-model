const {MongoClient} = require('mongodb');
import {describe, expect, test, beforeAll, afterAll} from '@jest/globals'
import next from "next";
import { nanoid } from 'nanoid';

next({});

describe('Testing the databse connection', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(process.env.DB_NAME);
  });

  afterAll(async () => {
    await connection.close();
  });

  test('insert,find and delete a user in collection', async () => {
    const users = db.collection('users');

    const mockUser = {
      _id: 'some-user-id',
      name: 'John',
      emailVerified: false,
      userType: 'new',
      email: 'test@email.com',
      password: 'testpassword',
    };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id' });
    expect(insertedUser).toEqual(mockUser);

    const deletedUserUser = await users.deleteOne({_id: 'some-user-id' });
    expect(deletedUserUser).toEqual(
      expect.objectContaining({ "deletedCount" : 1 })
    );
  });

  test('insert,find and delete a model input in collection', async () => {
    const model = db.collection('modelInputs');

    const mockModelInputs = {
      _id: nanoid(12),
      roofArea: 10,
      roofAngle: 30,
      panelEfficiency: 0.2,
      panelCost: 100,
      clientBudget: 1000,
      userId: 'some-user-id',
      createdAt: new Date(),
    };
    await model.insertOne(mockModelInputs);

    const insertedModelInputs = await model.findOne({ _id: mockModelInputs._id });
    expect(insertedModelInputs).toEqual(mockModelInputs);

    const deletedModelInputs = await model.deleteOne({ _id: mockModelInputs._id });
    expect(deletedModelInputs).toEqual(
      expect.objectContaining({ "deletedCount": 1 })
    );
  });
});
