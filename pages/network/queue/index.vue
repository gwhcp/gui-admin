<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { formArr, getSearch } = useNetworkQueue();

const route = useRoute();

const { cellParams, cellQueueType, cellSelected, filterString } = useSearchGrid();

const columnDefs = [
    {
        field: 'id',
        checkboxSelection: true,
        headerName: 'ID',
        filter: 'agTextColumnFilter',
        filterParams: filterString(),
        valueGetter: function (params: { data: { queue_status: { id: string; }; order_id: string; }; }) {
            return params.data['queue_status']['id'] + ' - ' + params.data['order_id']
        }
    },
    {
        field: 'name',
        headerName: 'Name',
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
        field: 'status_name',
        headerName: 'Status',
        filter: 'agTextColumnFilter',
        filterParams: filterString(),
        cellStyle: cellQueueType
    }
];

definePageMeta({
    description: 'Network Queue',
    title: 'Network Queue'
});

onMounted(() => {
    getSearch();

    hasAccess('admin_network_queue.view_queuestatus');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonNetworkQueue :cellParams="cellParams"
                           :cellSelected="cellSelected"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>