const pgp = require('./pg/init');

const errors = require('../errors/handle-error.js');

const createSQLTableFromKeys = async (keys, tableName) => {
  try {
    // Splitting the fileName gets rid of the .csv at the end,
    // We can do this alternatively in the main.js path resolution stage...

    const sqlStringArray = keys.map(key => {
      return `${key} text`
    }).join(",\n");

    // watch for SQL injection here ...

    const fullString = `CREATE TABLE ${tableName} (${sqlStringArray})`
    await pgp.none(fullString);
    return true
  } catch(err) { errors.handle(err); }
}

const insertCSVDataIntoDB = async (data, keys, tableName) => {
  try {

    const insertPrefixText = `INSERT INTO ${tableName}(${keys.join(', ')}) VALUES`
    
    const dataTextValues = data.map(datum => {
      return Object.values(datum).map(val => {
          // remove single quotations from raw text values.

          return ("'" + val.split("'").join('') + "'");
      }).join(', ')
    })

    let progress = 1;
    for (let textValues of dataTextValues) {
      try {
        console.log(`Uploading ${progress}/${dataTextValues.length}`);
        const query = `${insertPrefixText}(${textValues}) RETURNING *`
        await pgp.one(query);
        console.log("Success!")
        progress++
      } catch(err) {
        errors.handle(err)
      }
    }

    console.log("Uploaded all CSV data.");

  } catch(err) { errors.handle(err); }
}


module.exports = {
  createTable: createSQLTableFromKeys,
  insertData: insertCSVDataIntoDB
}