<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { formObj: domainObj, getEdit } = useCompanyDomain();

const { deleteRecord, formArr, formErrors, getSearch } = useCompanyDns();

const route = useRoute();

const { cellParams, cellSelected, filterDnsResults, filterString } = useSearchGrid();

const columnDefs = [
    {
        field: 'host',
        checkboxSelection: true,
        headerName: 'Host',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'record_type',
        headerName: 'Type',
        filter: 'agTextColumnFilter',
        filterParams: filterString(),
        valueGetter: function (params: { data: { record_type: string; mx_priority: string; }; }) {
            return (params.data.record_type === 'MX' ? params.data.record_type + ' ' + params.data.mx_priority : params.data.record_type)
        }
    },
    {
        field: 'data',
        headerName: 'Data',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    }
];

definePageMeta({
    description: 'Company DNS Records',
    title: 'Company DNS Records'
});

onMounted(() => {
    getEdit(route.params['domain_id'].toString());

    getSearch(route.params['domain_id'].toString());

    hasAccess('admin_company_dns.view_dnszone');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonCompanyDns :cellParams="cellParams"
                         :cellSelected="cellSelected"
                         :deleteFunction="deleteRecord"
                         :formErrors="formErrors"/>

    <h2 class="fs-5 mb-3">{{ domainObj['name'] }}</h2>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"
                :rowData="filterDnsResults(formArr)"/>
</template>

<style scoped>

</style>