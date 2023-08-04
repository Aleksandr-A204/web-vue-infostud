import axios from "axios";

const API_URL = "http://localhost:5053/api";

class GroupClient {
  async getGroupData() {
    const response = await axios.get(`${API_URL}/group`);

    return response.data;
  }
}

export default GroupClient;