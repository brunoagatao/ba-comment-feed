import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';

class PostService {
  static async getPosts() {
    try {
      const res = await axios.get(url);
      const data = res.data;
      return data.map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt)
      }));
    } catch (err) {
      return err;
    }
  }

  static insertPost(text) {
    return axios.post(url, {
      text
    });
  }

  static deletePost(id) {
    const deleteURL = `${url}${id}`;
    return axios.delete(deleteURL);
  }
}

export default PostService;
