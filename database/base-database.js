const fs                    = require('fs');
const { stringify, parse }  = require('flatted');

class BaseDatabase {
  constructor(model){
    this.model    = model;
    this.filename = model.name.toLowerCase();
  }

  save(objects) {
    fs.writeFileSync(`${this.filename}.json`, stringify(objects, null, 2));
  };
  
  load() {
    const file    = fs.readFileSync(`${this.filename}.json`, 'utf-8');
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
      users.push(o);
    })

    this.save(users)
  };
  
  remove(objects) {
    const users = this.load();

    objects.forEach(u => {
      const index = users.findIndex(user => user.id === u.id);
      if (index) {
        users.splice(index, 1);
      }
    })
  
    this.save(users);
  };
  
  findById(id) {
    const users = this.load();
    const user  = users.find(u => u.id === id);
  
    return user;
  }
}

module.exports = BaseDatabase;