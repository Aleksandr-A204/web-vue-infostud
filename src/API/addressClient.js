import axios from "axios";

const API_URL = "http://localhost:5053/api";

class AddressClient {
  async createAddress(addressObject) {
    const response = await axios.post(`${API_URL}/address`, {
      City: addressObject.city,
      PostIndex: addressObject.postindex,
      Street: addressObject.street
    });

    return response.data;
  }

  async getAddresses() {
    const response = await axios.get(`${API_URL}/address`);

    return response.data;
  }

  async deleteAddress(addressId) {
    const response = await axios.delete(`${API_URL}/address/${addressId}`);

    return response.data;
  }

  async updateAddress(addressObject) {
    const response = await axios.put(`${API_URL}/address`, {
      Id: addressObject.id,
      City: addressObject.city,
      PostIndex: addressObject.postindex,
      Street: addressObject.street
    });

    return response.data;
  }
}

export default AddressClient;