const getDataKeys = (csvData) => csvData[0];
const getDataValues = (csvData) => csvData.slice(1);

const sanitizeKeys = (keys) => {
  // Convert all keys to snake_case for predictability in the DB row names
  // Convert spaces, or dashes (in Regexp) to underscore. Can add more delimiters within the square brackets.
  return keys.map(key => {
    return key.split(/[ -]+/).join('_')
  })

}
const attachKeysToData = (data, keys) => {
  return data.reduce((acc, cur, index) => {
    const dataKey = keys[index];
    acc[dataKey] = cur;
    return acc;
  }, {})
}

module.exports = processRawCSVArray = (csvData) => {
  const keys = sanitizeKeys(getDataKeys(csvData));
  const data = getDataValues(csvData);
  const dataObject = data.map(values => {
    return attachKeysToData(values, keys)
  })
  return { keys, dataObject }
}
