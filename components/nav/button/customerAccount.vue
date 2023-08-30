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
        <NuxtLink v-if="route.name !== 'customer-account' && route.name !== 'customer-account-account_id-accesslog' && hasPerm('admin_customer_account.view_accesslog')"
                  :to="`/customer/account/${route.params?.['account_id']}/accesslog`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#circle-info"/>
            </svg>

            Access Log
        </NuxtLink>

        <NuxtLink v-if="cellSelected && route.name !== 'customer-account-account_id-edit' && hasPerm('admin_customer_account.change_account')"
                  :to="`/customer/account/${cellParams?.['id']}/edit`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Edit
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'customer-account' && route.name !== 'customer-account-create' && route.name !== 'customer-account-account_id-edit' && hasPerm('admin_customer_account.change_account')"
                  :to="`/customer/account/${route.params?.['account_id']}/edit`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Edit
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'customer-account' && hasPerm('admin_customer_account.view_account')"
                  class="btn btn-primary"
                  to="/customer/account"
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