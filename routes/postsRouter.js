const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const { getAllPosts, getPost, createPost, updatePost, deletePost, checkID } =
  postsController;

router.param("id", checkID);
router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);
module.exports = router;
