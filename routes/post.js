const express = require("express");
const router = express.Router();
const { createPost, getAllPosts, getUserPosts, getAllPostsWithMeta } = require("../controllers/postController");
const{likePost} = require("../controllers/postController")
const protect = require("../middleware/authMiddleware");
const authenticate = require("../middleware/authMiddleware")

router.post("/", protect, createPost);           // POST /api/posts
router.post("/like/:id", authenticate, likePost);
router.get("/feed", protect, getAllPostsWithMeta);
router.get("/", getAllPosts);                    // GET  /api/posts
router.get("/user/:userId", getUserPosts);       // GET  /api/posts/user/:userId

module.exports = router;
