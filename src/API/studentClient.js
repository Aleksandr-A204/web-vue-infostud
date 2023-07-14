import axios from "axios";

const API_URL = "http://localhost:5053/api";

class StudentClient {
  async getStudents(routeName) {
    const response = await axios.get(`${API_URL}/${routeName}`);
    return response.data;
  }

  async addNewStudent(routeName, newStudent) {
    const responce = await axios.post(`${API_URL}/${routeName}`, {
      Address: {
        City: newStudent.address.city,
        PostIndex: newStudent.address.postindex,
        Street: newStudent.address.street
      },
      Curriculum: {
        Course: newStudent.curriculum.course,
        Faculty: newStudent.curriculum.faculty,
        Group: newStudent.curriculum.group,
        Speciality: newStudent.curriculum.speciality
      },
      Contact: {
        Email: newStudent.contact.email,
        Phone: newStudent.contact.phone
      },
      FullName: newStudent.fullname
    });

    return responce.data;
  }

  async deleteStudent(routeName, studentId) {
    const responce = await axios.delete(`${API_URL}/${routeName}/${studentId}`);

    return responce.data;
  }

  async updateStudent(routeName, editedStudent) {
    const response = await axios.put(`${API_URL}/${routeName}`, {
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