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
    },
    deleteFunction: {
        type: Function,
        required: false
    },
    formErrors: {
        type: Object,
        required: false
    }
});

const route = useRoute();
</script>

<template>
    <div class="d-grid gap-2 d-md-flex mb-3">
        <NuxtLink v-if="route.name == 'store-coupon' && hasPerm('admin_store_coupon.add_coupon')"
                  class="btn btn-success"
                  to="/store/coupon/create"
                  type="button">
            <svg class="bi">
                <use xlink:href="#circle-plus"/>
            </svg>

            Create
        </NuxtLink>

        <ModalDelete v-if="cellSelected && hasPerm('admin_store_coupon.delete_coupon')"
                     :deleteFunction="<Function>deleteFunction"
                     :message-error="formErrors"
                     :params="{ id: cellParams?.['id'] }"
                     message-alert="Continuing will remove this coupon."
                     message-success="Coupon has been removed."
                     redirect="/store/coupon"/>

        <NuxtLink v-if="cellSelected && route.name !== 'store-coupon-coupon_id-edit' && hasPerm('admin_store_coupon.change_coupon')"
                  :to="`/store/coupon/${cellParams?.['id']}/edit`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Edit
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'store-coupon' && hasPerm('admin_store_coupon.view_coupon')"
                  class="btn btn-primary"
                  to="/store/coupon"
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