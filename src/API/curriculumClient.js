import axios from "axios";

const API_URL = "http://localhost:5053/api";

class CurriculumClient {
  async createCurriculum(newCurriculum) {
    try {
      await axios.post(`${API_URL}/curriculum`, newCurriculum);
    }
    catch (axiosError) {
      alert(axiosError.response.data);
    }
  }

  async deleteCurriculum(curriculumId) {
    const responce = await axios.delete(`${API_URL}/curriculum/${curriculumId}`);

    alert(responce.data);
  }

  async getCurriculums(keywordSearch = "", column) {
    const responce = await axios.get(`${API_URL}/curriculum`, {
      params: {
        keywordSearch: keywordSearch,
        sortProperty: column?.property,
        sortType: column?.sort
      }
    });

    return responce.data;
  }

  async updateCurriculum(oldCurriculum) {
    try {
      await axios.put(`${API_URL}/curriculum`, oldCurriculum);
    }
    catch (axiosError) {
      alert(axiosError.response.data);
    }
  }
}

export default CurriculumClient;
