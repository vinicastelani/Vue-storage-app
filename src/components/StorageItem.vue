<template>
  <v-card elevation="2" min-height="100%">
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
      <div><b>Total:</b> {{ formatter.format(data.value * data.amount) }}</div>
      <div><b>x</b>{{ data.amount }}</div>
    </v-card-text>
    <v-card-text class="">
      <b>Added by:</b> {{ data.addedBy.name }} <br />
      <b>Added at:</b>
      {{ new Date(data.createdAt).toLocaleDateString("en-GB") }}
    </v-card-text>
  </v-card>
</template>

<script>
import StorageService from "../services/StorageService";
export default {
  name: "item",
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
    deleteItem(id) {
      this.loading = true;

      StorageService.deleteItem(id)
        .then((response) => {
          this.$store.commit("updateMessage", response.msg);
          this.$emit("itemdeleted", true);
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$store.commit("updateMessage", e.response.data.msg);
        });
    },
  },
  props: ["data"],
};
</script>

<style>
</style>