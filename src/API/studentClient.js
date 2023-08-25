import axios from "axios";

const API_URL = "http://localhost:5053/api";

class StudentClient {
  async addNewStudent(newStudent) {
    await axios.post(`${API_URL}/student`, {
      city: newStudent.city,
      postindex: newStudent.postindex,
      street: newStudent.street,
      course: newStudent.course,
      faculty: newStudent.faculty,
      group: newStudent.group,
      speciality: newStudent.speciality,
      email: newStudent.email,
      phone: newStudent.phone,
      fullName: newStudent.fullName
    });
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
    await axios.put(`${API_URL}/student`, {
      city: editedStudent.city,
      postindex: editedStudent.postindex,
      street: editedStudent.street,
      course: editedStudent.course,
      faculty: editedStudent.faculty,
      group: editedStudent.group,
      speciality: editedStudent.speciality,
      email: editedStudent.email,
      phone: editedStudent.phone,
      fullName: editedStudent.fullName,
      id: editedStudent.id
    });
  }
}

export default StudentClient;
