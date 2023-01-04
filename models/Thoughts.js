const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reactions");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
