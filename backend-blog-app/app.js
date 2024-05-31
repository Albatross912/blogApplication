// index.js
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import Post from './model/post.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;
const dbURL = "mongodb+srv://piyushsharma912912:BX97rD033KrsLYJw@cluster0.kcm5wfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// Connect to MongoDB
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
  },
});

const getExt = (mimetype) => {
  switch (mimetype) {
    case 'image/png':
      return '.png';
    case 'image/jpeg':
      return '.jpg';
    default:
      return '';
  }
};

const upload = multer({ storage: storage });

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/uploads', express.static('uploads'));

// Endpoint to get an individual post by ID
app.get('/post/:post_id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (post) {
      res.status(200).send(post);
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    res.status(500).send('Error retrieving post');
  }
});

// Endpoint to get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(500).send('Error retrieving posts');
  }
});

// Endpoint to create a new post
app.post('/api/newpost', upload.single('post-image'), async (req, res) => {
  try {
    let str = req.file.path;
    let convertedPath = str.replace(/\\/g, '/');
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      post_image: convertedPath,
    });
    await newPost.save();
    res.status(201).send(newPost);
  } catch (error) {
    res.status(500).send('Error creating post');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port: http://localhost:${port}/`);
});
