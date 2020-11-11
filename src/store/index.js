import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // Variaveis
  state: {
    api: "https://vue-storage-api.vercel.app",
    session: {
      user: {
        _id: window.localStorage.getItem("UserID") || null,
        name: null,
      },
      token: window.localStorage.getItem("token") || null,
    },
    message: {
      type: "",
      data: "",
    },
  },
  getters: {
    showMessage(state) {
      return state.message.data;
    },
    loggedIn(state) {
      return state.session.token;
    },
  },
  mutations: {
    updateMessage(state, message) {
      state.message = message;
      setTimeout(() => {
        state.message = {};
      }, 3000);
    },
    updateName(state, value) {
      state.session.user.name = value;
    },
  },
});
