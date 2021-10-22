const fs                    = require('fs');
const { stringify, parse }  = require('flatted');
const colors                = require('colors')

class BaseDatabase {
  constructor(model){
    this.model    = model;
    this.filename = model.name.toLowerCase();
  }

  save(objects) {
    fs.writeFileSync(`${__dirname}/${this.filename}.json`, stringify(objects, null, 2));
  };
  
  load() {
    const file    = fs.readFileSync(`${__dirname}/${this.filename}.json`, 'utf-8');
    const objects = parse(file);

    return objects.map(this.model.create);
  }
  
  update(objects) {
    const users = this.load();
  
    objects.forEach(o => {
      const userIndex = users.findIndex(u => u.id === o.id);
      return users.splice(userIndex, 1, o);
    })
  
    this.save(users);
  }
  
  insert(objects) {
    const users = this.load();

    objects.forEach(o => {
      if (users.some(u => u.id === o.id)) {
        console.log(`You've already inserted ${colors.red(o.firstName)}.`);
        return;
      }
      users.push(o);
    })

    this.save(users);
  };
  
  remove(objects) {
    const users = this.load();

    objects.forEach(o => {
      const index = users.findIndex(user => user.id === o.id);
      if (index === -1) {
        console.log(`You've already removed ${colors.red(o.firstName)}.`);
        return;
      }
      users.splice(index, 1);
    })
  
    this.save(users);
  };
  
  findBy(property, value) {
    const users = this.load();
    const user  = users.find(u => u[property] === value);
  
    return user;
  }
}

module.exports = BaseDatabase;