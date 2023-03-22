<script setup>
// Import primevue Components
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import ConfirmDialog from 'primevue/confirmdialog';
import Button from 'primevue/button';

// Import objects
import { ref } from 'vue'
import { useConfirm } from "primevue/useconfirm";

// Populate data from local .json file
import jsonData from '../data/pokedex.json';
const data = ref(jsonData.pokemon);

// Select columns to show
const columns = [
  { field: 'num', header: 'Number' },
  { field: 'name', header: 'Name' },
  { field: 'type', header: 'Type' },
  { field: 'height', header: 'Height' },
  { field: 'weight', header: 'Weight' },
  { field: 'egg', header: 'Egg' }
];

// Reference needed to edit rowes
const editingRows = ref([]);

// Confirmation dialogue instance
const confirm = useConfirm();

// Handling RowEditSavve events
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

// Handling RowDelete events
function onRowDelete(idx, data, event) {
  confirm.require({
    message: `Are you sure you want to delete ${data.name}?`,
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
        <template #body="{ data, index }">
          <Button type="button" icon="pi pi-trash" @click="(event) => onRowDelete(index, data, event)" />
        </template>
      </Column>

    </DataTable>
  </div>
</template>