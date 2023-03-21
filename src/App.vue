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

const data = ref([nes, snes, megaDrive, playStation]);
const test = ref(0);
for (let i = 0; i < 100; i++) {
  const toAppend = { ...playStation };
  toAppend.manufacturer += i;
  test.value = data.value.push(toAppend);
}

const columns = [
  { field: 'manufacturer', header: 'Code' },
  { field: 'year', header: 'Name' },
  { field: 'bestSellingGame', header: 'Category' },
  { field: 'owned', header: 'Quantity' }
];
</script>

<template>
  {{ test }}

  <div class="card">
    <DataTable :value="data" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" tableStyle="min-width: 50rem">
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
    </DataTable>
  </div>
</template>

<style scoped></style>
