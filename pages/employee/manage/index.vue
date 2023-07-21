<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { deleteAccount, formArr, formErrors, getSearch } = useEmployeeManage();

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
    description: 'Search Employees',
    title: 'Search Employees'
});

onMounted(() => {
    getSearch();

    hasAccess('admin_employee_manage.view_account');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonEmployeeManage :cellParams="cellParams"
                             :cellSelected="cellSelected"
                             :deleteFunction="deleteAccount"
                             :formErrors="formErrors"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>