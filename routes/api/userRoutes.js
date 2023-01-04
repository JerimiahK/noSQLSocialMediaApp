const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
} = require("../../controllers/userControllers");

router.route("/").get(getUsers).post(createUser);

router
  .route("/:id")
  .get(getSingleUser)
  .delete(deleteUser);

module.exports = router;
