<script lang="ts"
        setup>
import { AgGridVue } from "ag-grid-vue3";

const props = defineProps({
    columnDefs: {
        type: Array,
        required: true
    },
    formArr: {
        type: Array,
        required: true
    }
});

const defaultColDef = {
    editable: false,
    flex: 1,
    onCellClicked: ((val: any) => {
        navigator.clipboard.writeText(val.value);
    }),
    resizable: true,
    sortable: true,
    filter: true
};

const gridOptions = {
    pagination: true,
    paginationPageSize: 20
};

const { selectionClear, selectionUpdate } = useSearchGrid();

const onSelectionChanged = () => {
    // @ts-ignore
    const selectedRows = gridOptions.api.getSelectedRows();

    selectionUpdate(selectedRows);
};

onMounted(() => {
    selectionClear();
});
</script>

<template>
    <AgGridVue :columnDefs="columnDefs"
               :defaultColDef="defaultColDef"
               :gridOptions="gridOptions"
               :rowData="formArr"
               animateRows="true"
               class="ag-theme-alpine"
               rowSelection="single"
               style="width: 100%; height: 500px;"
               @selection-changed="onSelectionChanged"/>
</template>

<style lang="scss">
@import "ag-grid-community/styles/ag-grid.css";
@import "ag-grid-community/styles/ag-theme-alpine.css";
</style>