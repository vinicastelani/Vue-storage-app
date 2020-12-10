<template>
  <v-card ref="form" elevation="2">
    <v-card-title>Add item</v-card-title>
    <v-card-text>
      <v-autocomplete
        :items="data"
        item-text="name"
        return-object
        v-model="item"
      ></v-autocomplete>
      <p>Description: {{ item.description }}</p>
      <p>{{ formatter.format(item.value || 0) }}</p>
      <div class="d-flex flex-row flex-wrap">
        <v-chip
          v-for="(category, index) in item.category"
          :key="index"
          class="mb-2 mr-1"
          color="light-blue"
          text-color="white"
          label
        >
          <b>{{ category }}</b>
        </v-chip>
      </div>
      <v-text-field label="Amount" type="number" required v-model="item.amount">
      </v-text-field>
    </v-card-text>
    <v-card-actions class="pb-5">
      <v-btn color="primary" :loading="loading" @click="createItem()">
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import StorageService from "../services/StorageService";
export default {
  name: "add-item-to-storage",
  props: ["data"],
  data() {
    return {
      item: {},
      loading: false,
      formatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
    };
  },
  methods: {
    createItem() {
      this.loading = true;

      let postItem = {
        name: this.item.name || null,
        _id: this.item._id || null,
        description: this.item.description || null,
        category: this.item.category || null,
        value: this.item.value * this.item.amount || null,
        amount: this.item.amount || null,
        createdBy: this.item.createdBy._id,
        addedBy: this.$store.state.session.user._id,
      };

      StorageService.addItem(postItem)
        .then((response) => {
          this.loading = false;
          this.$store.commit("updateMessage", response.msg);
          this.$emit("itemadded", true);
        })
        .catch((e) => {
          this.loading = false;
          this.$store.commit("updateMessage", e.response.data.msg);
        });
    },
  },
};
</script>

<style>
</style>