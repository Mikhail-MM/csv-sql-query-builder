const path = require('path');
const process = require('process');

const mainScriptPath = path.dirname(__filename);
const envPath = path.join(mainScriptPath, './.env');

require('dotenv').config({ path: envPath })

const csv = require('./utils/csv/csv.js');
const sql = require('./utils/sql/main');
const errors = require('./utils/errors/handle-error');

module.exports = {
  cli: async () => {

    const args = require('yargs').argv;
    const { mode, uri, upload } = args;

    if (mode === "local") {

      const baseName = path.basename(uri)
      const dirName = path.dirname(uri)
      
      const timeStampedFileName = `${baseName.split('.')[0]}_${Date.now()}`

      let filePath = uri;

      if (!path.isAbsolute(dirName)) {
        const cwd = process.cwd()
        filePath = path.join(cwd, dirName, baseName)
      }

      const { keys, data } = await csv.parse({
        mode,
        uri: filePath
      });

      if (upload) {
        await sql.createTable(keys, timeStampedFileName)
        const records = await sql.insertData(data, keys, timeStampedFileName);
      }
      
    } else {
      console.log("Invalid Command, Try Again.")
    }
  }
}