const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;

    const newPost = new Post({
      content,
      author: req.user._id, // or req.user.userId depending on your token
    });

    await newPost.save();

    // Get the io instance from app
    const io = req.app.get("io");

    // Emit a real-time event to all connected clients
    io.emit("new_post", { post: newPost });

    // Send response back to client
    res.status(201).json({ message: "Post created", post: newPost });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
};


exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error("Failed to fetch posts:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user's posts", error: err.message });
  }
};


exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      return res.status(400).json({ message: "Already liked" });
    }

    post.likes.push(userId);
    await post.save();

    const io = req.app.get("io");
    io.emit("post_liked", {
      postId: post._id,
      userId,
      likesCount: post.likes.length
    });

    return res.status(200).json({ message: "Post liked", likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: "Failed to like post", error: error.message });
  }
};

exports.getAllPostsWithMeta = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });

    const result = posts.map((post) => ({
      _id: post._id,
      content: post.content,
      author: post.author,
      createdAt: post.createdAt,
      likesCount: post.likes.length,
      likedByUser: post.likes.includes(userId),
    }));

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts", error: err.message });
  }
};


