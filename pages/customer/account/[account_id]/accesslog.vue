<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { formArr, getAccessLog } = useCustomerAccount();

const route = useRoute();

const { filterDate, filterString, formatDate } = useSearchGrid();

const columnDefs = [
    {
        field: 'date_from',
        headerName: 'Login Date',
        filter: 'agDateColumnFilter',
        filterParams: filterDate(),
        valueGetter: formatDate
    },
    {
        field: 'ipaddress',
        headerName: 'IP Address',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'reverse_ipaddress',
        headerName: 'Reverse IP Address',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    }
];

definePageMeta({
    description: 'Customer Access Log',
    title: 'Customer Access Log'
});

onMounted(() => {
    getAccessLog(route.params['account_id'].toString());

    hasAccess('admin_customer_account.view_account');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonCustomerAccount/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>