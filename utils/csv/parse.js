const fs = require('fs')
const csv = require("csv-parse")

const errors = require('../errors/handle-error.js')

const processRawCSVArray = require('./jsonify.js');

/**
 * 
 * @param {{
 *  URI: String
 *  mode: String
 * }} config
 * 
 * uri: A string path to a local or remote CSV file.
 * mode: A string describing the source of the URI filepath
 * 
 * 
 *  Acceptable Values: "absolute", "relative", "remote" 
 *    local: Full/Relative file path
 *    remote: HTTP URL
 *
 */

const parseFileFromPath = (config) => {
  return new Promise((resolve, reject) => {
    try {
      const { uri, mode } = config;
      switch(true){
        case(mode === "local"):
          const output = [];

          const parseStream = csv({
            delimiter: ',',
            skip_lines_with_error: true
          });

          parseStream.on('readable', () => {
            let record;
            while(record = parseStream.read()) {
              output.push(record);
            }
          })

          parseStream.on('end', () => {
            const { keys, data } = processRawCSVArray(output);
            parseStream.end();
            resolve({ keys, data });
          })

          const readableFileStream = fs.createReadStream(`${uri}`)

          readableFileStream.on('error', (err) => {
            reject(err);
          });

          parseStream.on('error', (err) => {
            reject(err);
          })

          readableFileStream.on('open', () => {
            console.log("Readable stream to file established.")
            readableFileStream.pipe(parseStream)
          });
          

          break;
        case(mode === "remote"):
        default:
          console.log("TODO: Remote HTTP Requests")
          break;
      }
    } catch(err) {
      errors.handle(err);
    }
  })
}

module.exports = parseFileFromPath;