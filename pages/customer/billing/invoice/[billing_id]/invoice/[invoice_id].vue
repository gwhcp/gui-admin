<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { formObj, getInvoice } = useCustomerBillingInvoice();

const route = useRoute();

const {
    cellParams,
    cellInvoiceType,
    cellSelected,
    cellTransactionType,
    filterDate,
    filterString,
    formatDate,
    formatInvoiceAmount,
    formatInvoiceType,
    formatTransactionType
} = useSearchGrid();

const columnDefs = [
    {
        field: 'amount',
        headerName: 'Amount',
        filter: 'agTextColumnFilter',
        filterParams: filterString(),
        valueGetter: formatInvoiceAmount
    },
    {
        field: 'invoice_type',
        headerName: 'Type',
        filter: 'agTextColumnFilter',
        filterParams: filterString(),
        valueFormatter: formatInvoiceType,
        cellStyle: cellInvoiceType
    },
    {
        field: 'transaction_type',
        headerName: 'Transaction Type',
        filter: 'agTextColumnFilter',
        filterParams: filterString(),
        valueFormatter: formatTransactionType,
        cellStyle: cellTransactionType
    },
    {
        field: 'date_from',
        headerName: 'Transaction Date',
        filter: 'agDateColumnFilter',
        filterParams: filterDate(),
        valueFormatter: formatDate
    }
];

definePageMeta({
    description: 'Billing Invoices',
    title: 'Billing Invoices'
});

onMounted(() => {
    getInvoice(route.params['billing_id'].toString(), route.params['invoice_id'].toString());

    hasAccess('admin_customer_billing_invoice.view_billinginvoice');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonCustomerBillingInvoice :cellParams="cellParams"
                                     :cellSelected="cellSelected"/>

    <div class="row row-cols-1 row-cols-lg-2 g-3 mb-3">
        <div class="col">
            <div class="border rounded p-3">
                <StaticData :value="route.params['invoice_id']"
                            name="Invoice ID"/>

                <StaticData :value="`${formObj['billing_profile']['id']} - ${formObj['billing_profile']['name']}`"
                            name="Billing Profile"/>

                <StaticData :datetime="formObj['date_from']"
                            name="Date From"/>
            </div>
        </div>

        <div class="col">
            <div class="border rounded p-3">
                <StaticData :value="`${formObj['order']['id']} - ${formObj['order']['status']}`"
                            name="Order"/>

                <StaticData :value="formObj['store_product']['name']"
                            name="Product"/>
            </div>
        </div>
    </div>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formObj['items']"/>
</template>

<style scoped>

</style>