
<template>
  <v-container>
    <v-row>
      <v-col col="auto" :xl="3" :lg="3" :md="4" :sm="12" :cols="12">
        <v-card>
          <v-card-actions class="d-flex justify-end">
            <v-btn text class="pa-2" @click="logout()">
              Log out
              <v-icon color="blue" medium>exit_to_app</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
            :md="6"
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
  name: "storage",
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
      axios.get(`${this.$store.state.api}/storage/`).then((res) => {
        this.itemsOnStorage = res.data.item;
      });
    },
    logout() {
      window.localStorage.removeItem("token");
      location.href = "/";
    },
  },
  mounted() {
    this.getStorage();
  },
};
</script>

<style>
</style>