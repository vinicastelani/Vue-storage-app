<template>
  <div>
    <v-card-title>Register</v-card-title>
    <v-card-text>
      <v-text-field
        label="Name"
        clearable
        required
        v-model="user.name"
      ></v-text-field>
      <v-text-field
        label="Email"
        clearable
        required
        v-model="user.email"
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        type="password"
        name="input-10-1"
        label="Password"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn :loading="loading" color="primary" @click="submit()">
        Submit
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "register-input",
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
      },
      loading: false,
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      try {
        await Axios.post(`${this.$store.state.api}/user/`, this.user).then(
          (res) => {
            this.$store.commit("updateMessage", res.data.msg);
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