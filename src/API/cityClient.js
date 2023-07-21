import axios from "axios";

const API_URL = "http://localhost:5053/api";

class CityClient {
  async getCityData() {
    const response = await axios.get(`${API_URL}/city`);

    return response.data;
  }
}

export default CityClient;