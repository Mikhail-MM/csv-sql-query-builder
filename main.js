const path = require('path');
const process = require('process');
const errors = require('./utils/errors/handle-error');
require('dotenv').config({path: './.env'})
const csv = require('./utils/csv/csv.js');
const { 
  parse
} = csv

/*

csv.parse({
  mode: 'local',
  URI: `C:/Users/mikem/Desktop/h1-challenge/client/public/LoanStats3a.csv`
});

*/

module.exports = {
  cli: () => {

    const args = require('yargs').argv;
    const { mode, uri } = args;

    if (mode === "local") {

      const baseName = path.basename(uri)
      const dirName = path.dirname(uri)

      if (!path.isAbsolute(dirName)) {

          const cwd = process.cwd()
          const joined = path.join(cwd, dirName, baseName)

        csv.parse({
          mode,
          uri: joined,
          fileName: baseName
        }).then(data => {
          //console.log(data)
        }).catch(err => errors.handle(err));

      } else {
        const data = csv.parse({
          mode,
          uri,
          fileName: baseName
        }).then(data => {
          //console.log(data);
        }).catch(err => errors.handle(err));
        console.log(data)
      }
    } else {
      console.log("Invalid Command, Try Again.")
    }
  }
}