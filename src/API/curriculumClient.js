import axios from "axios";

const API_URL = "http://localhost:5053/api";

class CurriculumClient {
  async createCurriculum(curriculumObject) {
    const responce = await axios.post(`${API_URL}/curriculum`, {
      courseId: curriculumObject.courseId,
      facultyId: curriculumObject.facultyId,
      groupId: curriculumObject.groupId,
      specialityId: curriculumObject.specialityId
    });

    alert(responce.data);
  }

  async deleteCurriculum(curriculumId) {
    const responce = await axios.delete(`${API_URL}/curriculum/${curriculumId}`);

    alert(responce.data);
  }

  async getCurriculums(keywordSearch = "") {
    const responce = await axios.get(`${API_URL}/curriculum`, {
      params: {
        keywordSearch: keywordSearch
      }
    });

    return responce.data;
  }

  async updateCurriculum(curriculumObject) {
    const responce = await axios.put(`${API_URL}/curriculum`, {
      id: curriculumObject.id,
      courseId: curriculumObject.courseId,
      facultyId: curriculumObject.facultyId,
      groupId: curriculumObject.groupId,
      specialityId: curriculumObject.specialityId
    });

    alert(responce.data);
  }
}

export default CurriculumClient;