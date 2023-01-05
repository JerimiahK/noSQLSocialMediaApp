const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtControllers");

router.route("/").get(getThoughts).post(createThought);

router.route("/:id").get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router;
