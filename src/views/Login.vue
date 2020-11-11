
<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col col="auto" :xl="4" :lg="4" :md="12" :sm="12" :cols="12">
        <v-card ref="form" v-if="this.$store.state.message.type">
          <v-alert :type="this.$store.state.message.type">
            <b>Status: </b> {{ this.$store.getters.showMessage }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col col="auto" :xl="4" :lg="4" :md="12" :sm="12" :cols="12">
        <v-card ref="form">
          <LoginInput v-if="!formSwitch" />
          <RegisterInput v-if="formSwitch" />
          <v-card-actions>
            <v-switch
              v-model="formSwitch"
              :label="formSwitch ? 'Create a account' : 'Login'"
            ></v-switch>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginInput from "../components/LoginInput";
import RegisterInput from "../components/RegisterInput.vue";
export default {
  name: "login",
  components: {
    LoginInput,
    RegisterInput,
  },
  data() {
    return {
      formSwitch: false,
    };
  },
};
</script>

<style>
.v-input--switch__track {
  color: #1976d2 !important;
}
.v-application .v-input--switch__thumb {
  color: white !important;
}
</style>