import { nanoid } from 'nanoid';

// Get an instance of model params created by the user
export async function getModelInputs(db, by, limit) {
  return db
    .collection('modelInputs')
    .find({
      // Find model inputs by user
      ...(by && { userId: by }),
    })
    .sort({ createdAt: -1 })
    .limit(limit || 10)
    .toArray();
}

// insert a new model input param in the database
export async function insertModelInputs(db, {
  roofArea, roofAngle, panelEfficiency, panelCost, clientBudget, userId,
}) {
  return db.collection('modelInputs').insertOne({
    _id: nanoid(12),
    roofArea,
    roofAngle,
    panelEfficiency,
    panelCost,
    clientBudget,
    userId,
    createdAt: new Date(),
  }).then(({ ops }) => ops[0]).catch((err) => console.log(err));
}
