<template>
  <v-card elevation="2" class="mt-4 mb-0">
    <v-card-title>Storage report</v-card-title>
    <v-card-subtitle>Vue app</v-card-subtitle>
    <v-card-text>
      Items on storage: {{ totalItems }} <br />
      Storage value: ${{ totalValue }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "report",
  props: ["data"],
  computed: {
    totalItems() {
      let total = 0;
      this.data.map((item) => {
        total += item.amount;
      });
      return total;
    },
    totalValue() {
      let total = 0;
      this.data.map((item) => {
        total += item.value;
      });
      return total;
    },
  },
};
</script>

<style>
</style>