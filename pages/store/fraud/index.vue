<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { deleteFraud, formArr, formErrors, getSearch } = useStoreFraud();

const route = useRoute();

const { cellParams, cellSelected, cellStatus, filterString, formatActiveStatus } = useSearchGrid();

const columnDefs = [
    {
        field: 'name',
        headerName: 'Name',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'fraud_type_name',
        headerName: 'Type',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'is_active',
        headerName: 'Status',
        filter: 'agTextColumnFilter',
        filterParams: filterString(),
        valueGetter: formatActiveStatus,
        cellStyle: cellStatus
    }
];

definePageMeta({
    description: 'Fraud Strings',
    title: 'Fraud Strings'
});

onMounted(() => {
    getSearch();

    hasAccess('admin_store_fraud.view_fraudstring');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonStoreFraud :cellParams="cellParams"
                         :cellSelected="cellSelected"
                         :deleteFunction="deleteFraud"
                         :formErrors="formErrors"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>