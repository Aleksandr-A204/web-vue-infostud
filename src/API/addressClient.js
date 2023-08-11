import axios from "axios";

const API_URL = "http://localhost:5053/api";

class AddressClient {
  async createAddress(addressObject) {
    const response = await axios.post(`${API_URL}/address`, {
      CityId: addressObject.cityId,
      PostindexId: addressObject.postindexId,
      StreetId: addressObject.streetId
    });

    alert(response.data);
  }

  async getAddresses() {
    const response = await axios.get(`${API_URL}/address`, {
      params: {
        keywordSearch: this.keywordSearch
      }
    });

    return response.data;
  }

  async deleteAddress(addressId) {
    const response = await axios.delete(`${API_URL}/address/${addressId}`);

    alert(response.data);
  }

  setKeywordSearch(keywordSearch) {
    this.keywordSearch = keywordSearch;
  }

  async updateAddress(addressObject) {
    const response = await axios.put(`${API_URL}/address`, {
      Id: addressObject.id,
      CityId: addressObject.cityId,
      PostindexId: addressObject.postindexId,
      StreetId: addressObject.streetId
    });

    alert(response.data);
  }
}

export default AddressClient;