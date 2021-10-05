const fs                    = require('fs');
const { stringify, parse }  = require('flatted');

const save = (filename, objects) => {
  fs.writeFileSync(`${filename}.json`, stringify(objects, null, 2));
};

const load = filename => {
  const file = fs.readFileSync(`${filename}.json`, 'utf-8');
  return parse(file);
}

const update = (filename, objects) => {
  const users = load(filename);

  objects.forEach(o => {
    const userIndex = users.findIndex(u => u.id === o.id);
    return users.splice(userIndex, 1, o);
  })

  save(filename, users);
}

const insert = (filename, object) => {
  const users = load(filename);

  const hasSameUser = users.find(u => u.id === object.id);

  if (hasSameUser) {
    return;
  }

  save(filename, users.concat(object))
};

const remove = (filename, object) => {
  const users         = load(filename);
  const hasSameUser   = users.find(u => u.id === object.id);

  if (!hasSameUser) {
    return;
  }

  const updatedUsers  = users.filter(u => u.id !== object.id);

  save(filename, updatedUsers);
};

module.exports = {
  save,
  load,
  update,
  insert,
  remove
}