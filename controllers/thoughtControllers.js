const { Thoughts, Users, Reactions } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
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

  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thought) => {
        return Users.findOneAndUpdate(
          { _id: req.body.id },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Tag created, but found no post with that ID" })
          : res.json("Created the tag 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.id })
      //   .then((user) =>
      //     !user
      //       ? res.status(404).json({ message: "No user with that ID" })
      //       : Thoughts.deleteMany({ _id: { $in: user.thoughts } })
      //   )
      .then(() => res.json({ message: "user and students deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
};
