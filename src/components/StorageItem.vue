<template>
  <v-card elevation="2">
    <v-card-title class="d-flex justify-space-between align-center">
      <span>
        {{ data.name }}
      </span>
      <span>
        <v-icon medium color="red" @click="deleteItem(data._id)"
          >mdi-trash-can-outline</v-icon
        >
      </span>
    </v-card-title>
    <v-card-subtitle>
      {{ data.description }}
    </v-card-subtitle>
    <v-card-text class="d-flex justify-space-between">
      <div><b>$</b>{{ data.value }}</div>
      <div><b>x</b>{{ data.amount }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import Axios from "axios";
export default {
  name: "Item",
  data() {
    return {};
  },
  methods: {
    async deleteItem(id) {
      await Axios.delete(`https://vue-storage-api.vercel.app/storage/${id}`);
      this.$emit("itemdeleted", true);
    },
  },
  props: ["data"],
};
</script>

<style>
</style>