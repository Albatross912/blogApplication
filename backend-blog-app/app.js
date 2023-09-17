import express from "express";
import Post from "./model/post.js";

const app = express();
const port = 3002;

const newPost = new Post();

app.get("/api/posts", (req, res) => {
  res.send(newPost.get());
});

app.listen(port, () =>
  console.log(`Listening on port: http://localhost:${port}/`)
);
