<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { deletePrice, formArr, formErrors, getSearch } = useStorePrice();

const route = useRoute();

const { cellParams, cellSelected, cellStatus, filterString, formatActiveStatus } = useSearchGrid();

const columnDefs = [
    {
        field: 'billing_cycle',
        headerName: 'Billing Cycle',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'base_price',
        headerName: 'Base Price',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'setup_price',
        headerName: 'Setup Price',
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
    description: 'Domain Hosting Prices',
    title: 'Domain Hosting Prices'
});

onMounted(() => {
    getSearch(route.params['product_id'].toString());

    hasAccess('admin_store_product_price.view_storeproductprice');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonStoreProductHostingDomainPrice :cellParams="cellParams"
                                             :cellSelected="cellSelected"
                                             :deleteFunction="deletePrice"
                                             :formErrors="formErrors"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>