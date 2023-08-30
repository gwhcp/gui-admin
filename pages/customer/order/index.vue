<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { formArr, getSearch } = useCustomerOrder();

const route = useRoute();

const { cellParams, cellSelected, cellOrderStatus, filterString, formatOrderStatus } = useSearchGrid();

const columnDefs = [
    {
        field: 'id',
        headerName: 'Order ID',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'status',
        headerName: 'Status',
        filter: 'agTextColumnFilter',
        filterParams: filterString(),
        valueFormatter: formatOrderStatus,
        cellStyle: cellOrderStatus
    }
];

definePageMeta({
    description: 'Search Orders',
    title: 'Search Orders'
});

onMounted(async () => {
    await getSearch();

    hasAccess('admin_customer_order.view_order');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonCustomerOrder :cellParams="cellParams"
                            :cellSelected="cellSelected"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>