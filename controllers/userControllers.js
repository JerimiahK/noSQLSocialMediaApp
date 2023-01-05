const { Users, Thoughts } = require("../models");

module.exports = {
  // GET all users route
  getUsers(req, res) {
    Users.find()
      .then((users) => res.json(users))
      .catch((err) => {
        return res.status(500).json(err);
      });
  },

  // GET single user
  getSingleUser(req, res) {
    console.log(req.params);
    Users.findOne({ _id: req.params.id })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST user
  createUser(req, res) {
    console.log(req.body);
    Users.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //UPDATE a User by ID
  updateUser(req, res) {
    console.log(req.body);
    Users.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    ).then((user) => res.json(user));
  },

  // DELETE a User by ID
  deleteUser(req, res) {
    Users.findOneAndDelete({ _id: req.params.id })
      //   .then((user) =>
      //     !user
      //       ? res.status(404).json({ message: "No user with that ID" })
      //       : Thoughts.deleteMany({ _id: { $in: user.thoughts } })
      //   )
      .then(() => res.json({ message: "user deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // POST a friend to a User
  addFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((friend) => res.json(friend))
      .catch((err) => res.status(500).json(err));
  },

  // DELETE a friend of a User
  removeFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.body._id } },
      { new: true }
    )
      .then(() => res.json({ message: "friend deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
};
