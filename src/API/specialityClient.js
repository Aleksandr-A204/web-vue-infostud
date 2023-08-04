import axios from "axios";

const API_URL = "http://localhost:5053/api";

class SpecialityClient {
  async getSpecialityData() {
    const response = await axios.get(`${API_URL}/speciality`);

    return response.data;
  }
}

export default SpecialityClient;