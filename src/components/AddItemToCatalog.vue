<template>
  <div>
    <v-card>
      <v-card-title> Add item to catalog </v-card-title>
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
        <div class="d-flex flex-row align-baseline">
          <v-text-field
            class="mr-4"
            label="Category"
            v-model="addToCategory"
            clearable
          >
          </v-text-field>
          <v-card-actions class="pb-5">
            <v-btn
              color="primary mx-auto"
              @click="
                if (addToCategory.length > 0) {
                  item.category.push(addToCategory);
                  addToCategory = null;
                }
              "
            >
              Add
            </v-btn>
          </v-card-actions>
        </div>
        <div class="d-flex flex-row flex-wrap">
          <v-chip
            v-for="(category, index) in item.category"
            :key="index"
            class="mb-2 ml-1 mr-1"
            color="light-blue"
            text-color="white"
            label
            @click="item.category.splice(index, 1)"
          >
            <b>{{ category }}</b>
            <v-icon small color="white">close</v-icon>
          </v-chip>
        </div>
      </v-card-text>
      <v-card-actions class="pb-5">
        <v-btn color="primary" :loading="loading" @click="submit()">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "add-item-to-catalog",
  data() {
    return {
      item: {
        name: "",
        value: 0,
        description: "",
        category: [],
        createdBy: this.$store.state.session.user._id,
      },
      addToCategory: null,
      loading: false,
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      try {
        await axios
          .post(`${this.$store.state.api}/catalog/`, this.item)
          .then((response) => {
            this.$store.commit("updateMessage", response.data.msg);
          });
        this.$emit("itemaddedoncatalog", true);
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