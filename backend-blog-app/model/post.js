import fs from "fs";
const PATH = "./model/allPost.json";

class Post {
  get() {
    return this.readData();
  }
  add(newPost) {
    const data = this.readData();
    data.unshift(newPost);
    this.storeData(data);
  }
  getIndividualBlog(postId) {
    const posts = this.readData();
    const foundPost = posts.find((post) => post.id == postId);
    return foundPost;
  }
  readData() {
    try {
      return JSON.parse(fs.readFileSync(PATH, "utf8"));
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  storeData(data) {
    try {
      fs.writeFileSync(PATH, JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }
}
export default Post;
