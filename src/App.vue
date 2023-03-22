<script setup>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import ConfirmDialog from 'primevue/confirmdialog';
import Button from 'primevue/button';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

import { ref } from 'vue'
import { useConfirm } from "primevue/useconfirm";

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


const confirm = useConfirm();

function onRowEditSave(event) {
  let { newData, index } = event;

  confirm.require({
    message: 'Confirm the edits?',
    header: 'Confirm',
    acceptLabel: 'Save',
    rejectLabel: 'Cancel',
    accept: () => {
      editData(newData, index);
    }
  });
}

function editData(newData, index) {
  data.value[index] = newData;
}

function onRowDelete(idx, event) {
    confirm.require({
      message: 'Are you sure you want to delete?',
      header: 'Confirm',
      acceptLabel: 'Yes, please delete',
      rejectLabel: 'Cancel',
      accept: () => {
        removeRow(idx);
      }
    });
}

function removeRow(index) {
  data.value.splice(index, 1);
}


</script>

<template>
  <ConfirmDialog></ConfirmDialog>
  <div class="card">
    <DataTable v-model:editingRows="editingRows" editMode="row" dataKey="id" @row-edit-save="onRowEditSave" :value="data"
      paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" tableStyle="min-width: 50rem">
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>
      <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
      <Column style="width: 5%; min-width: 6rem" bodyStyle="text-align:center">
        <template #body="{ index }">
          <Button type="button" icon="pi pi-trash" @click="(event) => onRowDelete(index, event)"></Button>
        </template>
      </Column>
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
