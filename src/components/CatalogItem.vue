<template>
  <v-card elevation="2">
    <v-card-title class="d-flex justify-space-between align-center">
      <span>
        {{ data.name }}
      </span>
      <span>
        <v-icon v-if="!loading" medium color="red" @click="deleteItem(data._id)"
          >mdi-trash-can-outline</v-icon
        >
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="red"
        ></v-progress-circular>
      </span>
    </v-card-title>
    <v-card-subtitle>
      {{ data.description }}
    </v-card-subtitle>
    <v-card-text class="d-flex justify-space-between">
      <div>{{ formatter.format(data.value) }}</div>
    </v-card-text>
    <v-card-text class="">
      <b>Created by:</b> {{ data.createdBy.name }} <br />
      <b>Created at:</b>
      {{ new Date(data.createdAt).toLocaleDateString("en-GB") }}
    </v-card-text>
  </v-card>
</template>

<script>
import Axios from "axios";
export default {
  name: "catalog-item",
  data() {
    return {
      loading: false,
      formatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
    };
  },
  methods: {
    async deleteItem(id) {
      this.loading = true;
      await Axios.delete(`${this.$store.state.api}/catalog/${id}`);
      this.$emit("itemdeleted", true);
    },
  },
  props: ["data"],
};
</script>

<style>
</style>