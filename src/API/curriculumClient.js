import axios from "axios";

const API_URL = "http://localhost:5053/api";

class CurriculumClient {
  async createCurriculum(routeName, curriculumObject) {
    const responce = await axios.post(`${API_URL}/${routeName}`, {
      Course: curriculumObject.course,
      Faculty: curriculumObject.faculty,
      Group: curriculumObject.group,
      Speciality: curriculumObject.speciality
    });

    return responce.data;
  }

  async deleteCurriculum(routeName, curriculumId) {
    const responce = await axios.delete(`${API_URL}/${routeName}/${curriculumId}`);

    return responce.data;
  }

  async getCurriculum(routeName) {
    const responce = await axios.get(`${API_URL}/${routeName}`);
    return responce.data;
  }

  async updateCurriculum(routeName, curriculumObject) {
    const responce = await axios.put(`${API_URL}/${routeName}`, {
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