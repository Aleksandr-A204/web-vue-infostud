import axios from "axios";

const API_URL = "http://localhost:5053/api";

class ContactClient {
  async createContact(contactObject) {
    const response = await axios.post(`${API_URL}/contact`, {
      Phone: contactObject.phone,
      Email: contactObject.email
    });

    return response.data;
  }

  async deleteContact(contactId) {
    const response = await axios.delete(`${API_URL}/contact/${contactId}`);

    return response.data;
  }

  async getContactData() {
    const response = await axios.get(`${API_URL}/contact`);

    return response.data;
  }

  async updateContact(contactObject) {
    const responce = await axios.put(`${API_URL}/contact`, {
      Id: contactObject.id,
      Phone: contactObject.phone,
      Email: contactObject.email
    });

    return responce.data;
  }
}

export default ContactClient;