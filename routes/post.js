const express = require("express");
const router = express.Router();
const { createPost, getAllPosts, getUserPosts } = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createPost);           // POST /api/posts
router.get("/", getAllPosts);                    // GET  /api/posts
router.get("/user/:userId", getUserPosts);       // GET  /api/posts/user/:userId

module.exports = router;
