const { Users, Thoughts } = require("../models");
const { ObjectId } = require("mongoose").Types;
const User = require("../models/Users");

module.exports = {
  // GET all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        return res.status(500).json(err);
      });
  },

  //GET a single thought
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.id })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //CREATE a thought
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thought) => {
        return Users.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //UPDATES a thought
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((update) => res.json(update))
  },

  //DELETE a thought
  deleteThought(req, res) {
    console.log(req.params);
    Thoughts.findOneAndRemove({ _id: req.params.id })
      .then(() =>
        User.findOneAndUpdate(
          { thoughts: req.params.id },
          { $pull: { thoughts: req.params.id } },
          { new: true }
        )
      )
      .then(() => res.json({ message: "user deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // POST a friend to a User
  addReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },

  // DELETE a friend of a User
  removeReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then(() => res.json({ message: "reaction deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
};
