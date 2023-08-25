import axios from "axios";

const API_URL = "http://localhost:5053/api";

class AddressClient {
  async createAddress(addressObject) {
    const response = await axios.post(`${API_URL}/address`, {
      cityId: addressObject.cityId,
      postindexId: addressObject.postindexId,
      streetId: addressObject.streetId
    });

    alert(response.data);
  }

  async getAddresses(keywordSearch = "") {
    const response = await axios.get(`${API_URL}/address`, {
      params: {
        keywordSearch: keywordSearch
      }
    });

    return response.data;
  }

  async deleteAddress(addressId) {
    const response = await axios.delete(`${API_URL}/address/${addressId}`);

    alert(response.data);
  }

  async editeAddress(addressObject) {
    const response = await axios.put(`${API_URL}/address`, {
      id: addressObject.id,
      cityId: addressObject.cityId,
      postindexId: addressObject.postindexId,
      streetId: addressObject.streetId
    });

    alert(response.data);
  }
}

export default AddressClient;
