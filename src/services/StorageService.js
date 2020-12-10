import Axios from "axios";

export default {
  async addItem(params) {
    const response = await Axios.post(
      process.env.VUE_APP_SERVICE_INSERT_STORAGE_ITEM,
      params
    );
    return response.data;
  },
  async deleteItem(id) {
    const response = await Axios.delete(
      process.env.VUE_APP_SERVICE_DELETE_STORAGE_ITEM + id
    );
    return response.data;
  },
};
