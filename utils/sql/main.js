const pgp = require('./pg/init');

const errors = require('../errors/handle-error.js');

createSQLTableFromKeys = (keys, filename) => {
  try {
    const timestamp = Date.now();
    const tableName = `${filename.split('.')[0]}_${timestamp}`;

    const sqlStringArray = keys.map(key => {
      return `${key.toUpperCase()} TEXT`
    }).join(",\n");

    const fullString = `CREATE TABLE ${tableName} (${sqlStringArray})`

    pgp.none(fullString);

  } catch(err) {
    errors.handle(err);
  }
}

module.exports = {
  createTable: createSQLTableFromKeys
}