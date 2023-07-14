import axios from "axios";

const API_URL = "http://localhost:5053/api";

class ContactClient {
  async createContact(routeName, contactObject) {
    const response = await axios.post(`${API_URL}/${routeName}`, {
      Phone: contactObject.phone,
      Email: contactObject.email
    });

    return response.data;
  }

  async deleteContact(routeName, contactId) {
    const response = await axios.delete(`${API_URL}/${routeName}/${contactId}`);

    return response.data;
  }

  async getContactData(routeName) {
    const response = await axios.get(`${API_URL}/${routeName}`);

    return response.data;
  }

  async updateContact(routeName, contactObject) {
    const responce = await axios.put(`${API_URL}/${routeName}`, {
      Id: contactObject.id,
      Phone: contactObject.phone,
      Email: contactObject.email
    });

    return responce.data;
  }
}

export default ContactClient;