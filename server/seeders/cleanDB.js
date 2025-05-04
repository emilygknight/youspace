import * as models from '../models/index.js'; // Import all models
import db from '../config/connection.js'; // Import the database connection

const dropCollection = async (modelName, collectionName) => {
  try {
    const modelExists = await models[modelName].db.db.listCollections({
      name: collectionName
    }).toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};

export default dropCollection;
