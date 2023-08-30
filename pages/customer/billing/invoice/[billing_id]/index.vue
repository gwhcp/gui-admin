<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { formArr, getSearch } = useCustomerBillingInvoice();

const route = useRoute();

const { cellParams, cellSelected, filterString } = useSearchGrid();

const columnDefs = [
    {
        field: 'id',
        headerName: 'Invoice ID',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'store_product_name',
        headerName: 'Store Product',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    }
];

definePageMeta({
    description: 'Billing Invoices',
    title: 'Billing Invoices'
});

onMounted(() => {
    getSearch(route.params['billing_id'].toString());

    hasAccess('admin_customer_billing_invoice.view_billinginvoice');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonCustomerBillingInvoice :cellParams="cellParams"
                                     :cellSelected="cellSelected"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>