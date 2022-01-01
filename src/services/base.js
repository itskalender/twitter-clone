class BaseService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findOne(findBy, fieldBy) {
    return this.model.findOne(findBy).select(fieldBy);
  }

  async findOneAndUpdate(findBy, data) {
    return this.model.findOneAndUpdate(findBy, data, {new: true, runValidators: true});
  }

  async findById(id, fieldBy) {
    return this.model.findById(id).select(fieldBy);
  }

  async findByIdAndUpdate(id, data) {
    return this.model.findByIdAndUpdate(id, data, {new: true, runValidators: true});
  }

  async findByIdAndDelete(id) {
    return this.model.findByIdAndDelete(id);
  }

  async find({ filterBy, sortBy, fieldBy, skip, limit }) {
    let query = this.model.find(filterBy);

    if (sortBy) {
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    if (fieldBy) {
      query = query.select(fieldBy);
    }
    
    {
      query = query.skip(skip).limit(limit);
    }
    
    return query;
  }
}

module.exports = BaseService;