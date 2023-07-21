<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { deleteProduct, formArr, formErrors, getSearch } = useStoreHostingDomain();

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
        field: 'is_active',
        headerName: 'Status',
        filter: 'agTextColumnFilter',
        filterParams: filterString(),
        valueGetter: formatActiveStatus,
        cellStyle: cellStatus
    }
];

definePageMeta({
    description: 'Store Domain Hosting Product',
    title: 'Store Domain Hosting Product'
});

onMounted(() => {
    getSearch();

    hasAccess('admin_store_product.view_storeproduct');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonStoreProductHostingDomain :cellParams="cellParams"
                                        :cellSelected="cellSelected"
                                        :deleteFunction="deleteProduct"
                                        :formErrors="formErrors"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>