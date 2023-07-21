<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { deletePayment, formArr, formErrors, getSearch } = useBillingPayment();

const route = useRoute();

const {
    cellParams,
    cellSelected,
    cellStatus,
    filterString,
    formatActiveStatus,
    formatInTestModeStatus,
} = useSearchGrid();

const columnDefs = [
    {
        field: 'merchant_name',
        headerName: 'Merchant',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'in_test_mode',
        headerName: 'Test Mode',
        filter: 'agTextColumnFilter',
        filterParams: filterString(),
        valueGetter: formatInTestModeStatus,
        cellStyle: cellStatus
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
    description: 'Payment Gateways',
    title: 'Payment Gateways'
});

onMounted(() => {
    getSearch();

    hasAccess('admin_billing_payment.view_paymentgateway');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonBillingPayment :cellParams="cellParams"
                             :cellSelected="cellSelected"
                             :deleteFunction="deletePayment"
                             :formErrors="formErrors"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>