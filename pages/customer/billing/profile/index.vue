<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { formArr, getSearch } = useCustomerBillingProfile();

const route = useRoute();

const { cellParams, cellSelected, cellStatus, filterString, formatActiveStatus } = useSearchGrid();

const columnDefs = [
    {
        field: 'id',
        headerName: 'Profile ID',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
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
    description: 'Search Billing Profiles',
    title: 'Search Billing Profiles'
});

onMounted(() => {
    getSearch();

    hasAccess('admin_customer_billing_profile.view_billingprofile');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonCustomerBillingProfile :cellParams="cellParams"
                                     :cellSelected="cellSelected"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>