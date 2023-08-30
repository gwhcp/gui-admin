<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { deleteCoupon, formArr, formErrors, getSearch } = useStoreCoupon();

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
        field: 'amount',
        headerName: 'Amount',
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
    description: 'Coupons',
    title: 'Coupons'
});

onMounted(() => {
    getSearch();

    hasAccess('admin_store_coupon.view_coupon');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonStoreCoupon :cellParams="cellParams"
                          :cellSelected="cellSelected"
                          :deleteFunction="deleteCoupon"
                          :formErrors="formErrors"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>