const fs = require('fs');

const save = (filename, objects) => {
  fs.writeFileSync(`${filename}.json`, JSON.stringify(objects));
};

module.exports = {save}