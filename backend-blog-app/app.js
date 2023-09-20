import express from "express";
import Post from "./model/post.js";
import multer from "multer";
const app = express();
const port = 3002;

const newPost = new Post();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
  },
});

const getExt = (mimetype) => {
  switch (mimetype) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
  }
};

var upload = multer({ storage: storage });
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

app.post("/api/newpost", upload.single("post-image"), (req, res) => {
  let str = req.file.path;
  var convertedPath = str.replace(/\\/g, "/");
  const newP = {
    id: `${Date.now()}`,
    title: req.body.title,
    content: req.body.content,
    post_image: convertedPath,
    added_date: `${Date.now()}`,
  };
  newPost.add(newP);
  res.status(201).send(newP);
});

app.listen(port, () =>
  console.log(`Listening on port: http://localhost:${port}/`)
);
