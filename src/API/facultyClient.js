import axios from "axios";

const API_URL = "http://localhost:5053/api";

class FacultyClient {
  async getFacultyData() {
    const response = await axios.get(`${API_URL}/faculty`);

    return response.data;
  }
}

export default FacultyClient;