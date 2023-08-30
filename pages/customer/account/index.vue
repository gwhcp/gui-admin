<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { formArr, getSearch } = useCustomerAccount();

const route = useRoute();

const { cellParams, cellSelected, cellStatus, filterString, formatActiveStatus } = useSearchGrid();

const columnDefs = [
    {
        field: 'name',
        headerName: 'Name',
        filter: 'agTextColumnFilter',
        filterParams: filterString(),
        valueGetter: function (params: { data: { first_name: string; last_name: string; }; }) {
            return params.data.first_name + ' ' + params.data.last_name
        }
    },
    {
        field: 'email',
        headerName: 'Email',
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
    description: 'Search Accounts',
    title: 'Search Accounts'
});

onMounted(() => {
    getSearch();

    hasAccess('admin_customer_account.view_account');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonCustomerAccount :cellParams="cellParams"
                              :cellSelected="cellSelected"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>