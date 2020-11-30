
<template>
  <v-container>
    <v-row>
      <v-col col="auto" :xl="3" :lg="3" :md="12" :sm="12" :cols="12">
        <v-card>
          <v-card-actions class="d-flex justify-end">
            <v-btn text class="pa-2" @click="logout()">
              Log out
              <v-icon color="blue" medium>exit_to_app</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="mt-3">
          <v-tabs background-color="light-blue" centered dark>
            <v-tabs-slider></v-tabs-slider>
            <v-tab @click="changeDisplayComponent(1)"> Catalog </v-tab>
            <v-tab @click="changeDisplayComponent(2)"> Storage </v-tab>
            <v-tab @click="changeDisplayComponent(3)"> report </v-tab>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="auto" :xl="3" :lg="3" :md="4" :sm="12" :cols="12">
        <v-card ref="form" v-if="this.$store.state.message.type">
          <v-alert :type="this.$store.state.message.type">
            <b>Status: </b> {{ this.$store.getters.showMessage }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="auto" :xl="3" :lg="3" :md="4" :sm="12" :cols="12">
        <Addtocatalog
          v-show="displayComponent.addItemToCatalog"
          v-on:itemaddedoncatalog="getCatalog()"
        />
        <Addtostorage
          v-show="displayComponent.addItem"
          :data="itemsOnCatalog"
          v-on:itemadded="getStorage()"
        />
        <StorageReport
          v-show="displayComponent.report"
          :data="itemsOnStorage"
        />
      </v-col>
      <v-col col="auto" :xl="9" :lg="9" :md="8" :sm="12" :cols="12">
        <v-row>
          <v-col
            v-show="displayComponent.addItemToCatalog"
            col="auto"
            :xl="4"
            :lg="4"
            :md="6"
            :sm="6"
            :cols="12"
            v-for="(item, index) in itemsOnCatalog"
            :key="index"
            style="padding-top: 0"
          >
            <CatalogItem
              :data="itemsOnCatalog[index]"
              v-on:itemdeleted="getCatalog()"
            />
          </v-col>
          <v-col
            v-show="displayComponent.addItem"
            col="auto"
            :xl="4"
            :lg="4"
            :md="6"
            :sm="6"
            :cols="12"
            v-for="(item, index) in itemsOnStorage"
            :key="'storage' + index"
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
import Addtocatalog from "../components/AddItemToCatalog";
import CatalogItem from "../components/CatalogItem";
import StorageItem from "../components/StorageItem";
import StorageReport from "../components/StorageReport";
export default {
  name: "storage",
  components: {
    Addtostorage,
    CatalogItem,
    StorageItem,
    StorageReport,
    Addtocatalog,
  },
  data() {
    return {
      itemsOnStorage: [],
      itemsOnCatalog: [],
      displayComponent: {
        addItemToCatalog: true,
        addItem: false,
        report: false,
      },
    };
  },
  methods: {
    changeDisplayComponent(val) {
      switch (val) {
        case 1:
          this.displayComponent.addItemToCatalog = true;
          this.displayComponent.addItem = false;
          this.displayComponent.report = false;
          break;
        case 2:
          this.displayComponent.addItemToCatalog = false;
          this.displayComponent.addItem = true;
          this.displayComponent.report = false;
          break;
        case 3:
          this.displayComponent.addItemToCatalog = false;
          this.displayComponent.addItem = false;
          this.displayComponent.report = true;
          break;
      }
    },
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
    getCatalog() {
      axios.get(`${this.$store.state.api}/catalog/`).then((res) => {
        this.itemsOnCatalog = res.data.catalog;
      });
    },
    logout() {
      window.localStorage.removeItem("token");
      location.href = "/";
    },
  },
  mounted() {
    this.getStorage();
    this.getCatalog();
  },
};
</script>

<style>
</style>