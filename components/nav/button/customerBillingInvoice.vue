<script lang="ts"
        setup>
const { hasPerm } = useAuthorization();

const props = defineProps({
    cellParams: {
        type: Object,
        required: false
    },
    cellSelected: {
        type: Boolean,
        required: false
    }
});

const route = useRoute();
</script>

<template>
    <div class="d-grid gap-2 d-md-flex mb-3">
        <NuxtLink v-if="hasPerm('admin_customer_billing_profile.view_billingprofile')"
                  :to="`/customer/billing/profile/${route.params['billing_id']}/edit`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#hand-holding-dollar"/>
            </svg>

            Billing Profile
        </NuxtLink>

        <NuxtLink v-if="cellSelected && route.name !== 'customer-billing-invoice-billing_id-edit' && route.name !== 'customer-billing-invoice-billing_id-invoice-invoice_id' && hasPerm('admin_customer_billing_invoice.view_billinginvoice')"
                  :to="`/customer/billing/invoice/${route.params['billing_id']}/invoice/${cellParams?.['id']}`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Edit
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'customer-billing-invoice-billing_id' && hasPerm('admin_customer_billing_invoice.view_billinginvoice')"
                  :to="`/customer/billing/invoice/${route.params['billing_id']}`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#magnifying-glass"/>
            </svg>

            Invoices
        </NuxtLink>
    </div>
</template>

<style scoped>
.bi {
    display: inline-block;
    width: 1rem;
    height: 1rem;
}
</style>