import axios from "axios";

const API_URL = "http://localhost:5053/api";

class AddressClient {
  async createAddress(newAddress) {
    try {
      await axios.post(`${API_URL}/address`, newAddress);
    }
    catch (axiosError) {
      alert(axiosError.response.data);
    }
  }

  async getAddresses(keywordSearch = "", column) {
    const response = await axios.get(`${API_URL}/address`, {
      params: {
        keywordSearch: keywordSearch,
        sortProperty: column?.property,
        sortType: column?.sort
      }
    });

    return response.data;
  }

  async deleteAddress(addressId) {
    const response = await axios.delete(`${API_URL}/address/${addressId}`);

    alert(response.data);
  }

  async editeAddress(oldAddress) {
    try {
      await axios.put(`${API_URL}/address`, oldAddress);
    }
    catch (axiosError) {
      alert(axiosError.response.data);
    }
  }
}

export default AddressClient;
