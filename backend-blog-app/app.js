import express from "express";
import Post from "./model/post.js";

const app = express();
const port = 3002;

const newPost = new Post();
app.use(express.static("public"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/uploads", express.static("uploads"));
app.get("/post/:post_id", (req, res) => {
  const id = req.params.post_id; 
  const found = newPost.getIndividualBlog(id);
  if (found) res.status(200).send(found);
  else res.status(404).send("not found");
});

app.get("/api/posts", (req, res) => {
  res.send(newPost.get());
});

app.listen(port, () =>
  console.log(`Listening on port: http://localhost:${port}/`)
);
