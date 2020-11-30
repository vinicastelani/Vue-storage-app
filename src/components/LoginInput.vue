<template>
  <div>
    <v-card-title> Login </v-card-title>
    <v-card-text>
      <v-text-field
        label="Email"
        required
        v-model="user.email"
        value="visacastelani@gmail.com"
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        type="password"
        name="input-10-1"
        label="Password"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" :loading="loading" @click="submit()">
        Submit
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "login-input",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      formSwitch: true,
      loading: false,
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      try {
        await Axios.post(`${this.$store.state.api}/user/login`, this.user).then(
          async (response) => {
            window.localStorage.setItem("token", response.data.token);
            window.localStorage.setItem(
              "Username",
              JSON.stringify(response.data.log)
            );
            this.$store.commit("updateMessage", response.data.msg);
            // location.href = "/storage";
          }
        );
      } catch (e) {
        this.$store.commit("updateMessage", e.response.data.msg);
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>