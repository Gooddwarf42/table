<script setup>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

import { ref } from 'vue'

const nes = {
  manufacturer: "Nintendo",
  name: "Nintendo Entertainment System",
  year: 1986,
  bestSellingGame: "Super Mario Bros",
  owned: true,
  id: 100
};
const snes = {
  manufacturer: "Nintendo",
  name: "Super Nintendo",
  year: 1991,
  bestSellingGame: "Super Mario World",
  owned: true,
  id: 101
};
const megaDrive = {
  manufacturer: "Sega",
  name: "Mega Drive",
  year: 1990,
  bestSellingGame: "Sonic The Hedgehog",
  owned: true,
  id: 102
};
const playStation = {
  manufacturer: "Sony",
  name: "PlayStation",
  year: 1994,
  bestSellingGame: "Crash Bandicoot",
  owned: false,
  id: 103
};

const data = ref([nes, snes, megaDrive, playStation]);
const test = ref(0);
for (let i = 0; i < 100; i++) {
  const toAppend = { ...playStation };
  toAppend.manufacturer += i;
  toAppend.id = i;
  test.value = data.value.push(toAppend);
}

const columns = [
  { field: 'name', header: 'Name' },
  { field: 'manufacturer', header: 'Code' },
  { field: 'year', header: 'Year' },
  { field: 'bestSellingGame', header: 'Category' },
  { field: 'owned', header: 'Quantity' }
];

const editingRows = ref([]);

const onRowEditSave = (event) => {
  let { newData, index } = event;

  data.value[index] = newData;
};
</script>

<template>
  {{ test }}

  <div class="card">
    <DataTable v-model:editingRows="editingRows" editMode="row" dataKey="id" @row-edit-save="onRowEditSave" :value="data"
      paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" tableStyle="min-width: 50rem">
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>
      <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
    </DataTable>
  </div>



  <div class="card">
    <DataTable v-model:editingRows="editingRows" editMode="row" dataKey="id" @row-edit-save="onRowEditSave" :value="data"
      paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" tableStyle="min-width: 50rem">
      <Column field="name" header="Name">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>
      <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
    </DataTable>
  </div>
</template>

<style scoped></style>
