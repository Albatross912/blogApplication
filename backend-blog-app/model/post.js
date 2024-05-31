// models/post.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  post_image: {
    type: String,
    required: true,
  },
  added_date: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;
