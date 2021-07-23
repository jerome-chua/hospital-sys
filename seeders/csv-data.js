const parse = require('csv-parse');
const fs = require('fs');

async function translateCSV(fname) {
  return new Promise((resolve) => {
    const arr = [];
    fs.createReadStream(`${__dirname}/${fname}.csv`)
      .pipe(
        parse({
          delimiter: ',',
        }),
      )
      .on('data', (dataRow) => {
        arr.push(dataRow);
      })
      .on('end', () => {
        resolve(arr);
      });
  });
}

const readCsvFn = async () => {
  try {
    const csvData = {};
    const fileNames = ['doctors', 'patients', 'appointments'];

    for (idx in fileNames) {
      const key = fileNames[idx];
      csvData[key] = await translateCSV(key);
    }

    return csvData;
    
  } catch (err) {
    console.log(err);
  }
};

module.exports = readCsvFn;