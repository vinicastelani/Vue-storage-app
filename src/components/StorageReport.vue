<template>
  <v-card elevation="2" class="mt-4 mb-0">
    <v-card-title>Storage report</v-card-title>
    <v-card-subtitle>Vue app</v-card-subtitle>
    <v-card-text>
      Items on storage: {{ totalItems }} <br />
      <!-- Storage value: {{ formatter.format(totalValue) }} -->
      Storage value: {{ formatter.format(totalValue) }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "report",
  props: ["data"],
  data() {
    return {
      formatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
    };
  },
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
        total += parseInt(item.value);
      });
      return total;
    },
  },
};
</script>

<style>
</style>