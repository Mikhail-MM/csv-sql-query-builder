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

      if (!path.isAbsolute(dirName)) {

          const cwd = process.cwd()
          const joined = path.join(cwd, dirName, baseName)

        csv.parse({
          mode,
          uri: joined,
        }).then(async ({ keys, data }) => {
          if (upload) {
            const darkness = await sql.createTable(keys, timeStampedFileName)
            console.log(darkness)
          }
        }).catch(err => errors.handle(err));

      } else {
        const data = csv.parse({
          mode,
          uri,
        }).then( async ({ keys, data }) => {
          if (upload) {
            const darkness = await sql.createTable(keys, timeStampedFileName)
            console.log(darkness)
          }
        }).catch(err => errors.handle(err));
        console.log(data)
      }
    } else {
      console.log("Invalid Command, Try Again.")
    }
  }
}