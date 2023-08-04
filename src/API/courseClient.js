import axios from "axios";

const API_URL = "http://localhost:5053/api";

class CourseClient {
  async getCourseData() {
    const response = await axios.get(`${API_URL}/course`);

    return response.data;
  }
}

export default CourseClient;