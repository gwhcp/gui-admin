<script lang="ts"
        setup>
const { hasAccess, hasPermForm } = useAuthorization();

const { formArr, formErrors, formObj, getEdit, retryQueue } = useNetworkQueue();

const route = useRoute();

const router = useRouter();

const { cellParams, cellQueueType, cellSelected, filterString } = useSearchGrid();

const columnDefs = [
    {
        field: 'order_id',
        headerName: 'Order ID',
        filter: 'agNumberColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'name',
        headerName: 'Name',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'ipaddress',
        headerName: 'IP Address',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'status_name',
        headerName: 'Status',
        filter: 'agTextColumnFilter',
        filterParams: filterString(),
        cellStyle: cellQueueType
    }
];

definePageMeta({
    description: 'Edit Queue',
    title: 'Edit Queue'
});

onMounted(() => {
    getEdit(route.params['queue_status_id'].toString());

    hasAccess('admin_network_queue.view_queuestatus');

    hasPermForm('admin_network_queue.change_queuestatus');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonNetworkQueue/>

    <div class="row mb-3">
        <div class="col">
            <div class="border rounded p-3">
                <StaticData :datetime="formObj['date_from']"
                            name="Created Date"/>

                <StaticData v-if="formObj['account']"
                            :value="formObj['account']"
                            ahref="#"
                            name="Account ID"
                            permission="client_account.view_account"/>

                <StaticData v-if="formObj['order']"
                            :value="formObj['order']"
                            ahref="#"
                            name="Order ID"
                            permission="client_order.view_order"/>

                <StaticData v-if="formObj['product_profile']"
                            :value="formObj['product_profile']"
                            ahref="#"
                            name="Product Profile ID"
                            permission="client_product_profile.view_product_profile"/>
            </div>
        </div>
    </div>

    <div v-if="formErrors?.['queue_status']"
         class="alert alert-warning alert-dismissible fade show"
         role="alert">
        {{ formErrors?.['queue_status'] }}

        <button aria-label="Close"
                class="btn-close"
                data-bs-dismiss="alert"
                type="button"/>
    </div>

    <div class="d-grid gap-2 d-md-flex mb-3">
        <div class="btn btn-primary"
             type="button"
             v-on:click="reloadNuxtApp({force: true, path: route.fullPath });">
            <svg class="bi">
                <use xlink:href="#rotate"/>
            </svg>

            Refresh Page
        </div>

        <div class="btn btn-success"
             type="button"
             @click="retryQueue(route.params['queue_status_id'].toString())">
            <svg class="bi">
                <use xlink:href="#rotate-right"/>
            </svg>

            Retry Failed Queue
        </div>
    </div>

    <div class="row mb-3">
        <SearchGrid :column-defs="columnDefs"
                    :form-arr="formArr"/>
    </div>
</template>

<style scoped>
.bi {
    display: inline-block;
    width: 1rem;
    height: 1rem;
}
</style>