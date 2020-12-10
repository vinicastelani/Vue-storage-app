import Axios from "axios";

export default {
  async getCatalog() {
    const response = await Axios.get(process.env.VUE_APP_SERVICE_CATALOG);
    return response.data.catalog;
  },
  async addItem(params) {
    const response = await Axios.post(
      process.env.VUE_APP_SERVICE_INSERT_CATALOG_ITEM,
      params
    );
    return response.data;
  },
  async updateItem(id, params) {
    const response = await Axios.put(
      process.env.VUE_APP_SERVICE_CATALOG + id,
      params
    );
    return response.data;
  },
  async deleteItem(id) {
    const response = await Axios.delete(
      process.env.VUE_APP_SERVICE_DELETE_CATALOG_ITEM + id
    );
    return response.data;
  },
};
