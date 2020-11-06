
<template>
  <v-container>
    <v-row>
      <v-col col="auto" :xl="3" :lg="3" :md="4" :sm="12" :cols="12">
        <Addtostorage v-on:itemadded="getStorage()" />
        <StorageReport :data="itemsOnStorage" />
      </v-col>
      <v-col col="auto" :xl="9" :lg="9" :md="8" :sm="12" :cols="12">
        <v-row>
          <v-col
            col="auto"
            :xl="4"
            :lg="4"
            :md="4"
            :sm="6"
            :cols="12"
            v-for="(item, index) in itemsOnStorage"
            :key="index"
            style="padding-top: 0"
          >
            <StorageItem
              :data="itemsOnStorage[index]"
              v-on:itemdeleted="getStorage()"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Addtostorage from "../components/AddItemToStorage";
import StorageItem from "../components/StorageItem";
import StorageReport from "../components/StorageReport";
export default {
  name: "Storage",
  components: {
    Addtostorage,
    StorageItem,
    StorageReport,
  },
  data() {
    return {
      itemsOnStorage: [],
    };
  },
  methods: {
    renderItem(value) {
      this.itemsOnStorage.push({
        name: value.name,
        description: value.description,
        value: value.value,
        amount: value.amount,
      });
    },
    getStorage() {
      axios.get("http://localhost:5000/storage").then((res) => {
        this.itemsOnStorage = res.data.item;
      });
    },
  },
  //   computed: {
  //     storage() {
  //       return axios.get("http://localhost:5000/storage");
  //     },
  //   },
  mounted() {
    this.getStorage();
  },
};
</script>

<style>
</style>