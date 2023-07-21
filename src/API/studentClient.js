import axios from "axios";

const API_URL = "http://localhost:5053/api";

class StudentClient {
  async getStudents() {
    const response = await axios.get(`${API_URL}/student`);

    return response.data;
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

    return responce.data;
  }

  async deleteStudent(studentId) {
    const responce = await axios.delete(`${API_URL}/student/${studentId}`);

    return responce.data;
  }

  async updateStudent(editedStudent) {
    const response = await axios.put(`${API_URL}/student`, {
      Address: {
        City: editedStudent.address.city,
        PostIndex: editedStudent.address.postindex,
        Street: editedStudent.address.street
      },
      Curriculum: {
        Course: editedStudent.curriculum.course,
        Faculty: editedStudent.curriculum.faculty,
        Group: editedStudent.curriculum.group,
        Speciality: editedStudent.curriculum.speciality
      },
      Contact: {
        Email: editedStudent.contact.email,
        Phone: editedStudent.contact.phone
      },
      Id: editedStudent.id,
      FullName: editedStudent.fullname
    });

    return response.data;
  }
}

export default StudentClient;