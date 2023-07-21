<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { deletePool, formArr, formErrors, getSearch } = useNetworkPool();

const route = useRoute();

const { cellParams, cellSelected, filterString } = useSearchGrid();

const columnDefs = [
    {
        field: 'name',
        headerName: 'Name',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'network',
        headerName: 'Network',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'assigned_name',
        headerName: 'Assigned',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    }
];

definePageMeta({
    description: 'Network IP Pool',
    title: 'Network IP Pool'
});

onMounted(() => {
    getSearch();

    hasAccess('admin_network_pool.view_ipaddresssetup');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonNetworkPool :cellParams="cellParams"
                          :cellSelected="cellSelected"
                          :deleteFunction="deletePool"
                          :formErrors="formErrors"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>