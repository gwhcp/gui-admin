<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { formArr, getAccessLog } = useEmployeeAccount();

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
    description: 'Employee Access Log',
    title: 'Access Log'
});

onMounted(() => {
    getAccessLog();

    hasAccess('admin_employee_account.view_account');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonEmployeeAccount/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>