import axios from "axios";

const API_URL = "http://localhost:5053/api";

class PostindexClient {
  async getPostindexData() {
    const response = await axios.get(`${API_URL}/postindex`);

    return response.data;
  }
}

export default PostindexClient;