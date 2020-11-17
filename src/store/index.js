import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // Variaveis
  state: {
    api: "https://vue-storage-api.vercel.app",
    session: {
      user: JSON.parse(window.localStorage.getItem("Username")),
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
    updateUser(state, user) {
      state.session.user = user;
    },
  },
});
