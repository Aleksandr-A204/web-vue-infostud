import axios from "axios";

const API_URL = "http://localhost:5053/api";

class AddressClient {
  async createAddress(routeName, addressObject) {
    const response = await axios.post(`${API_URL}/${routeName}`, {
      City: addressObject.city,
      PostIndex: addressObject.postindex,
      Street: addressObject.street
    });

    return response.data;
  }

  async getAddresses(routeName) {
    const response = await axios.get(`${API_URL}/${routeName}`);

    return response.data;
  }

  async deleteAddress(routeName, addressId) {
    const response = await axios.delete(`${API_URL}/${routeName}/${addressId}`);

    return response.data;
  }

  async updateAddress(routeName, addressObject) {
    const response = await axios.put(`${API_URL}/${routeName}`, {
      Id: addressObject.id,
      City: addressObject.city,
      PostIndex: addressObject.postindex,
      Street: addressObject.street
    });

    return response.data;
  }
}

export default AddressClient;