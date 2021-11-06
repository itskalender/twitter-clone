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

    return Promise.all( [follower.save(), following.save()] );

    // await follower.save();
    // await following.save();
  }

  async unfollow(unfollowerId, unfollowingId) {
    const unfollower  = await this.findById(unfollowerId);
    const unfollowing = await this.findById(unfollowingId);

    unfollower.followings = unfollower.followings.filter(user => user.id !== unfollowingId);
    unfollowing.followers = unfollowing.followers.filter(user => user.id !== unfollowerId);

    unfollower.home = unfollower.home.filter(tweet => tweet.author.id !== unfollowingId);

    await unfollower.save();
    await unfollowing.save();
  }
};

module.exports = new UserService(User)