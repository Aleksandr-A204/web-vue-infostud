import axios from "axios";

const API_URL = "http://localhost:5053/api";

class CurriculumClient {
  async createCurriculum(curriculumObject) {
    const responce = await axios.post(`${API_URL}/curriculum`, {
      Course: curriculumObject.course,
      Faculty: curriculumObject.faculty,
      Group: curriculumObject.group,
      Speciality: curriculumObject.speciality
    });

    return responce.data;
  }

  async deleteCurriculum(curriculumId) {
    const responce = await axios.delete(`${API_URL}/curriculum/${curriculumId}`);

    return responce.data;
  }

  async getCurriculum() {
    const responce = await axios.get(`${API_URL}/curriculum`);

    return responce.data;
  }

  async updateCurriculum(curriculumObject) {
    const responce = await axios.put(`${API_URL}/curriculum`, {
      Course: curriculumObject.course,
      Faculty: curriculumObject.faculty,
      Id: curriculumObject.id,
      Group: curriculumObject.group,
      Speciality: curriculumObject.speciality
    });

    return responce.data;
  }
}

export default CurriculumClient;