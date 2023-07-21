<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { deleteEmail, formArr, formErrors, getSearch } = useSettingEmail();

const route = useRoute();

const { cellParams, cellSelected, filterString } = useSearchGrid();

const columnDefs = [
    {
        field: 'subject',
        headerName: 'Subject',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'template_name',
        headerName: 'Template',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    }
];

definePageMeta({
    description: 'Email Templates',
    title: 'Email Templates'
});

onMounted(() => {
    getSearch();

    hasAccess('admin_setting_email.view_emailtemplate');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonSettingEmail :cellParams="cellParams"
                           :cellSelected="cellSelected"
                           :deleteFunction="deleteEmail"
                           :formErrors="formErrors"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>