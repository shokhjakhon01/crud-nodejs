const fs = require("fs");
const posts = JSON.parse(fs.readFileSync("./dev-data/data/posts.json"));

exports.checkID = (req, res, next) => {
  if (Number(req.params.id) > posts.length) {
    return res.status(404).json({
      status: "error",
      message: "InvalidId entered",
    });
  }
  next();
};

exports.getAllPosts = (req, res) => {
  try {
    res.status(200).json({
      status: "sucess",
      results: posts.length,
      posts: {
        posts,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getPost = (req, res) => {
  try {
    const post = posts.find((post) => post.id === Number(req.params.id));
    res.status(200).json({
      status: "success",
      results: post.length || 1,
      post: {
        post,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.createPost = (req, res) => {
  try {
    const id = posts[posts.length - 1].id + 1;
    const newPost = Object.assign({ id: id }, req.body);
    posts.push(newPost);
    fs.writeFile("./dev-data/data/posts.json", JSON.stringify(posts), (err) => {
      res.status(201).json({
        status: "success",
        post: {
          newPost,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updatePost = (req, res) => {
  try {
    const postIndex = posts.findIndex(
      (post) => post.id === Number(req.params.id)
    );

    if (postIndex != -1) {
      posts[postIndex].title = req.body.title;
      posts[postIndex].body = req.body.body;
    }

    fs.writeFile("./dev-data/data/posts.json", JSON.stringify(posts), (err) => {
      res.status(200).json({
        status: "success",
        updatedPost: posts[postIndex],
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deletePost = (req, res) => {
  const postIndex = posts.findIndex(
    (post) => post.id === Number(req.params.id)
  );
  posts.splice(postIndex, 1);
  fs.writeFile("./dev-data/data/posts.json", JSON.stringify(posts), (err) => {
    res.status(200).json({
      status: "success",
      message: "delete post successfully",
    });
  });
};
