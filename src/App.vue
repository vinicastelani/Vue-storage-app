<template>
  <v-app>
    <Navbar />
    <Storage />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Storage from "./views/Storage";
export default {
  name: "App",

  components: {
    Navbar,
    Storage,
  },

  data: () => ({
    //
  }),
};
</script>

