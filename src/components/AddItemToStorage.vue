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
      <v-btn color="primary" :loading="loading" @click="submit()">
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
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
    async submit() {
      this.loading = true;
      let postItem = {
        name: this.item.name || null,
        id: this.item.id || null,
        description: this.item.description || null,
        category: this.item.category || null,
        value: this.item.value * this.item.amount || null,
        amount: this.item.amount || null,
        createdBy: this.$store.state.session.user._id,
      };
      console.log(postItem);
      try {
        await axios
          .post(`${this.$store.state.api}/storage/`, postItem)
          .then((response) => {
            this.$store.commit("updateMessage", response.data.msg);
          });
        this.$emit("itemadded", true);
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