import axios from "axios";

const API_URL = "http://localhost:5053/api";

class StudentClient {
  async addNewStudent(newStudent) {
    try {
      await axios.post(`${API_URL}/student`, newStudent);
    }
    catch (axiosError) {
      alert(axiosError.response.data);
    }
  }

  async getStudents(keywordSearch = "", column) {
    const response = await axios.get(`${API_URL}/student`, {
      params: {
        keywordSearch: keywordSearch,
        sortProperty: column?.property[0].toUpperCase() + column?.property.slice(1),
        sortType: column?.sort
      }
    });

    return response.data;
  }

  async deleteStudent(studentId) {
    const responce = await axios.delete(`${API_URL}/student/${studentId}`);

    alert(responce.data);
  }

  async editStudent(editedStudent) {
    try {
      await axios.put(`${API_URL}/student`, editedStudent);
    }
    catch (axiosError) {
      alert(axiosError.response.data);
    }
  }
}

export default StudentClient;
