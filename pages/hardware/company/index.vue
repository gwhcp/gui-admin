<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { deleteHardware, formArr, formErrors, getSearch } = useHardwareCompany();

const route = useRoute();

const { cellParams, cellSelected, cellQueueStatus, filterString, formatQueueStatus } = useSearchGrid();

const columnDefs = [
    {
        field: 'domain_name',
        headerName: 'Domain',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'ipaddress',
        headerName: 'IP Address',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'is_active',
        headerName: 'Status',
        filter: 'agTextColumnFilter',
        filterParams: filterString(),
        valueGetter: formatQueueStatus,
        cellStyle: cellQueueStatus
    }
];

definePageMeta({
    description: 'Company Hardware',
    title: 'Company Hardware'
});

onMounted(() => {
    getSearch();

    hasAccess('admin_hardware_company.view_server');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonHardwareCompany :cellParams="cellParams"
                              :cellSelected="cellSelected"
                              :deleteFunction="deleteHardware"
                              :formErrors="formErrors"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>