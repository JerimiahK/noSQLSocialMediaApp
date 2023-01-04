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

  deleteUser(req, res) {
    Users.findOneAndDelete({ _id: req.params.id })
      //   .then((user) =>
      //     !user
      //       ? res.status(404).json({ message: "No user with that ID" })
      //       : Thoughts.deleteMany({ _id: { $in: user.thoughts } })
      //   )
      .then(() => res.json({ message: "user and students deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
};

//get all users
//get one user by id with friend and thought data
//post user
//put user by id
//delete user id

// /api/users/:userId/friends/:friendId
// post new friend to users friend list
// delete
