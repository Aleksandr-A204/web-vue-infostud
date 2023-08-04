import axios from "axios";

const API_URL = "http://localhost:5053/api";

class StudentClient {
  setKeywordSearch(keywordSearch) {
    this.keywordSearch = keywordSearch;
  }

  async addNewStudent(newStudent) {
    const responce = await axios.post(`${API_URL}/student`, {
      City: newStudent.address.city,
      Postindex: newStudent.address.postindex,
      Street: newStudent.address.street,
      Course: newStudent.curriculum.course,
      Faculty: newStudent.curriculum.faculty,
      Group: newStudent.curriculum.group,
      Speciality: newStudent.curriculum.speciality,
      Contact: {
        Email: newStudent.contact.email,
        Phone: newStudent.contact.phone
      },
      FullName: newStudent.fullname
    });

    alert(responce.data);

    return this.getStudents();
  }

  async getStudents() {
    const response = await axios.get(`${API_URL}/student/1`);

    return response.data;
  }

  async deleteStudent(studentId) {
    const responce = await axios.delete(`${API_URL}/student/${studentId}`);

    alert(responce.data);

    return this.getStudents();
  }

  async updateStudent(editedStudent) {
    const response = await axios.put(`${API_URL}/student`, {
      City: editedStudent.address.city,
      Postindex: editedStudent.address.postindex,
      Street: editedStudent.address.street,
      Course: editedStudent.curriculum.course,
      Faculty: editedStudent.curriculum.faculty,
      Group: editedStudent.curriculum.group,
      Speciality: editedStudent.curriculum.speciality,
      Contact: {
        Email: editedStudent.contact.email,
        Phone: editedStudent.contact.phone
      },
      FullName: editedStudent.fullname,
      Id: editedStudent.id
    });

    alert(response.data);

    return this.getStudents();
  }
}

export default StudentClient;