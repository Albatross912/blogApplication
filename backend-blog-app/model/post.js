import fs from "fs";
const PATH = "./model/allPost.json";

class Post {
  get() {
    return this.readData();
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
