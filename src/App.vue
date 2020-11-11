<template>
  <v-app>
    <Navbar />
    <transition
      name="router-anim"
      enter-active-class="animated fadeIn"
      leave-active-class
    >
      <router-view />
    </transition>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>
<style >
/* TRANSITION EFFECT */
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
/* TRANSITION EFFECT */
</style>

