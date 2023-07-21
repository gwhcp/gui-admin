<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { deleteDomain, formArr, formErrors, getSearch } = useCompanyDomain();

const route = useRoute();

const { cellParams, cellSelected, filterString } = useSearchGrid();

const columnDefs = [
    {
        field: 'name',
        checkboxSelection: true,
        headerName: 'Domain',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    }
];

definePageMeta({
    description: 'Company domains',
    title: 'Company Domains'
});

onMounted(() => {
    getSearch();

    hasAccess('admin_company_domain.view_domain');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonCompanyDomain :cellParams="cellParams"
                            :cellSelected="cellSelected"
                            :deleteFunction="deleteDomain"
                            :formErrors="formErrors"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>