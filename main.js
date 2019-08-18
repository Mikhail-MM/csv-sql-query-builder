const path = require('path');
const process = require('process');

require('dotenv').config({path: './.env'})

const csv = require('./utils/csv/csv.js');
const sql = require('./utils/sql/main');
const errors = require('./utils/errors/handle-error');

module.exports = {
  cli: () => {

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

      csv.parse({
        mode,
        uri: filePath,
      }).then(async ({ keys, data }) => {
        if (upload) {
          const darkness = await sql.createTable(keys, timeStampedFileName)
          console.log(darkness)
        }
      }).catch(err => errors.handle(err));

    } else {
      console.log("Invalid Command, Try Again.")
    }
  }
}