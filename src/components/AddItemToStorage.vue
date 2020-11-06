<template>
  <v-card ref="form" elevation="2">
    <v-card-title>Add item</v-card-title>
    <v-card-text>
      <v-text-field
        label="Name"
        counter="25"
        clearable
        required
        v-model="item.name"
      >
      </v-text-field>
      <v-text-field
        label="Description"
        counter="80"
        clearable
        required
        v-model="item.description"
      >
      </v-text-field>
      <v-text-field
        label="Value"
        type="number"
        prefix="$"
        min="0"
        required
        v-model="item.value"
      >
      </v-text-field>
      <v-text-field
        label="Amount"
        type="number"
        min="1"
        required
        v-model="item.amount"
      >
      </v-text-field>
    </v-card-text>
    <v-card-actions class="pb-5">
      <v-btn color="primary" outlined> Cancel </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="submit()"> Submit </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Add item to storage",
  data() {
    return {
      item: {
        name: "",
        description: "",
        value: "",
        amount: "",
      },
    };
  },
  methods: {
    async submit() {
      await axios.post("http://localhost:5000/storage", this.item);
      this.$emit("itemadded", true);
    },
  },
};
</script>

<style>
</style>