const BaseService = require('./base-service');
const { User }    = require('../models');

class UserService extends BaseService {
  async findByName(name) {
    return this.findBy('name', name);
  }
  
  async findByUsername(username) {
    return this.findBy('username', username);
  }

  async follow(followerId, followingId) {
    const follower  = await this.findById(followerId);
    const following = await this.findById(followingId);

    follower.followings.push(following);
    following.followers.push(follower);

    follower.home = follower.home.concat(following.tweets); // Ordering

    await follower.save();
    await following.save();
  }
};

module.exports = new UserService(User)