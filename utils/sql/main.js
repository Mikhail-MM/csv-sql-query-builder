const pgp = require('./pg/init');

const errors = require('../errors/handle-error.js');

createSQLTableFromKeys = async (keys, tableName) => {
  try {
    // Splitting the fileName gets rid of the .csv at the end,
    // We can do this alternatively in the main.js path resolution stage...

    const sqlStringArray = keys.map(key => {
      return `${key} text`
    }).join(",\n");

    const fullString = `CREATE TABLE ${tableName} (${sqlStringArray})`
    const success = await pgp.none(fullString);
    console.log(success);
  } catch(err) {
    errors.handle(err);
  }
}

module.exports = {
  createTable: createSQLTableFromKeys
}