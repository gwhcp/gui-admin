<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { formObj: domainObj, getProfile } = useCompanyDomain();

const { deleteMail, formArr, formErrors, getSearch } = useCompanyMail();

const route = useRoute();

const { cellParams, cellSelected, filterString } = useSearchGrid();

const columnDefs = [
    {
        field: 'name',
        headerName: 'Name',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'mail_type_name',
        headerName: 'Type',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    }
];

definePageMeta({
    description: 'Company mail accounts',
    title: 'Company Mail Accounts'
});

onMounted(() => {
    getProfile(route.params['domain_id'].toString());

    getSearch(route.params['domain_id'].toString());

    hasAccess('admin_company_mail.view_mail');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonCompanyMail :cellParams="cellParams"
                          :cellSelected="cellSelected"
                          :deleteFunction="deleteMail"
                          :formErrors="formErrors"/>

    <h2 class="fs-5 mb-3">{{ domainObj['name'] }}</h2>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>