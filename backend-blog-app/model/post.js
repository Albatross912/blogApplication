import fs from "fs";
const PATH = "./model/allPost.json";

class Post {
  get() {
    return this.readData();
  }
  getIndividualBlog(postId){
    console.log(postId)
    const posts = this.readData();
    const foundPost = posts.find((post) => post.id == postId);
    return foundPost
  }
  readData() {
    try {
      return JSON.parse(fs.readFileSync(PATH, "utf8"));
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
export default Post;
