<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { deleteReason, formArr, formErrors, getSearch } = useBillingReason();

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
        field: 'reason_type_name',
        headerName: 'Type',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    }
];

definePageMeta({
    description: 'Billing Reasons',
    title: 'Billing Reasons'
});

onMounted(() => {
    getSearch();

    hasAccess('admin_billing_reason.view_reason');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonBillingReason :cellParams="cellParams"
                            :cellSelected="cellSelected"
                            :deleteFunction="deleteReason"
                            :formErrors="formErrors"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>