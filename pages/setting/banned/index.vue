<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { deleteBanned, formArr, formErrors, getSearch } = useSettingBanned();

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
        field: 'banned_type_name',
        headerName: 'Type',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    }
];

definePageMeta({
    description: 'Banned Items',
    title: 'Banned Items'
});

onMounted(() => {
    getSearch();

    hasAccess('admin_setting_banned.view_banned');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonSettingBanned :cellParams="cellParams"
                            :cellSelected="cellSelected"
                            :deleteFunction="deleteBanned"
                            :formErrors="formErrors"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>