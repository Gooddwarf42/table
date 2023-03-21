<script setup>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

import { ref } from 'vue'

const nes = {
  manufacturer: "Nintendo",
  year: 1986,
  bestSellingGame: "Super Mario Bros",
  owned: true
};
const snes = {
  manufacturer: "Nintendo",
  year: 1991,
  bestSellingGame: "Super Mario World",
  owned: true
};
const megaDrive = {
  manufacturer: "Sega",
  year: 1990,
  bestSellingGame: "Sonic The Hedgehog",
  owned: true
};
const playStation = {
  manufacturer: "Sony",
  year: 1994,
  bestSellingGame: "Crash Bandicoot",
  owned: false
};

const data = ref([nes, snes, megaDrive, playStation])

const columns = [
  { field: 'manufacturer', header: 'Code' },
  { field: 'year', header: 'Name' },
  { field: 'bestSellingGame', header: 'Category' },
  { field: 'owned', header: 'Quantity' }
];
</script>

<template>
  {{ data }}
  <div class="card">
    aa
    <DataTable :value="data" tableStyle="min-width: 50rem">
      <Column field="manufacturer" header="Manufacturer"></Column>
      <Column field="year" header="Year"></Column>
      <Column field="bestSellingGame" header="Best Selling Game"></Column>
      <Column field="owned" header="Owned"></Column>
    </DataTable>
  </div>

  <main>
    aa
    <div class="card">
      <DataTable :value="data" tableStyle="min-width: 50rem">
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
      </DataTable>
    </div>
  </main>
</template>

<style scoped></style>
