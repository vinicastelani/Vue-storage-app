<template>
  <v-card elevation="2" min-height="100%">
    <v-card-title class="d-flex justify-space-between align-center">
      <p v-if="!updateItemForm">
        {{ data.name }}
      </p>
      <v-spacer></v-spacer>
      <span>
        <v-icon medium color="light-blue" @click="handleClick()">edit</v-icon>
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
    <v-card-text v-if="updateItemForm">
      <v-text-field
        label="Name"
        counter="25"
        clearable
        required
        v-model="itemToUpdate.name"
      >
      </v-text-field>
    </v-card-text>
    <v-card-subtitle v-if="!updateItemForm">
      {{ data.description }}
    </v-card-subtitle>
    <v-card-text v-if="updateItemForm">
      <v-text-field
        label="Description"
        counter="25"
        clearable
        required
        v-model="itemToUpdate.description"
      >
      </v-text-field>
    </v-card-text>
    <v-card-text v-if="!updateItemForm" class="d-flex justify-space-between">
      <div>{{ formatter.format(data.value) }}</div>
    </v-card-text>
    <v-card-text v-if="updateItemForm">
      <v-text-field
        label="Value"
        counter="25"
        clearable
        required
        v-model="itemToUpdate.value"
      >
      </v-text-field>
    </v-card-text>
    <v-card-actions v-if="updateItemForm">
      <v-btn :loading="updLoading" @click="updateItem()"> Update </v-btn>
    </v-card-actions>
    <v-card-text class="">
      <b>Created by:</b> {{ data.createdBy.name }} <br />
      <b>Created at:</b>
      {{ new Date(data.createdAt).toLocaleDateString("en-GB") }}
    </v-card-text>
    <div class="d-flex flex-row flex-wrap ma-2">
      <v-chip
        v-for="(category, index) in data.category"
        :key="index"
        class="mb-2 ml-1 mr-1"
        color="light-blue"
        text-color="white"
        label
      >
        <b>{{ category }}</b>
      </v-chip>
    </div>
  </v-card>
</template>

<script>
import CatalogService from "../services/CatalogService";
export default {
  name: "catalog-item",
  data() {
    return {
      loading: false,
      updLoading: false,
      updateItemForm: false,
      itemToUpdate: {
        name: this.data.name,
        _id: this.data._id,
        value: this.data.value,
        description: this.data.description,
      },
      formatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
    };
  },
  methods: {
    handleClick() {
      this.updateItemForm = !this.updateItemForm;
    },
    deleteItem(id) {
      this.loading = true;
      CatalogService.deleteItem(id)
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
    updateItem() {
      this.updLoading = true;
      CatalogService.updateItem(this.itemToUpdate._id, this.itemToUpdate)
        .then((response) => {
          this.$store.commit("updateMessage", response.msg);
          this.$emit("itemupdated", true);
          this.updLoading = false;
          this.updateItemForm = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$store.commit("updateMessage", e.response.data.msg);
          this.updLoading = false;
        });
    },
  },
  props: ["data"],
};
</script>

<style>
</style>