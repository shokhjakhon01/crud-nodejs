const express = require("express");
const userRouter = require("./routes/userRouter");
const postsRouter = require("./routes/postsRouter");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

app.use("/api/users", userRouter);
app.use("/api/users/:id", userRouter);
app.use("/api/posts", postsRouter);
app.use("/api/posts/:id", postsRouter);

module.exports = app;
