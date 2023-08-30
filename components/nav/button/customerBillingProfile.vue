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
        <NuxtLink v-if="cellSelected && route.name !== 'customer-billing-profile-billing_id-edit' && hasPerm('admin_customer_billing_profile.change_billingprofile')"
                  :to="`/customer/billing/profile/${cellParams?.['id']}/edit`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Edit
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'customer-billing-profile' && route.name !== 'customer-billing-profile-billing_id-edit' && hasPerm('admin_customer_billing_profile.change_billingprofile')"
                  :to="`/customer/billing/profile/${route.params?.['account_id']}/edit`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Edit
        </NuxtLink>

        <NuxtLink v-if="route.name === 'customer-billing-profile-billing_id-edit' && hasPerm('admin_customer_billing_invoice.view_billinginvoice')"
                  :to="`/customer/billing/invoice/${route.params['billing_id']}`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#magnifying-glass"/>
            </svg>

            Invoices
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'customer-billing-profile' && hasPerm('admin_customer_billing_profile.view_billingprofile')"
                  class="btn btn-primary"
                  to="/customer/billing/profile"
                  type="button">
            <svg class="bi">
                <use xlink:href="#magnifying-glass"/>
            </svg>

            Search
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