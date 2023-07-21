import axios from "axios";

const API_URL = "http://localhost:5053/api";

class StreetClient {
  async getStreetData() {
    const response = await axios.get(`${API_URL}/street`);

    return response.data;
  }
}

export default StreetClient;