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
        <NuxtLink v-if="hasPerm('admin_store_product.view_storeproduct')"
                  class="btn btn-primary"
                  to="/store/product"
                  type="button">
            <svg class="bi">
                <use xlink:href="#shop"/>
            </svg>

            Products
        </NuxtLink>

        <NuxtLink v-if="hasPerm('admin_store_product.view_storeproduct')"
                  :to="`/store/product/hosting/domain/${route.params['product_id']}/edit`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Hosting Product
        </NuxtLink>

        <NuxtLink v-if="route.name == 'store-product-hosting-domain-product_id-price' && hasPerm('admin_store_product_price.add_storeproductprice')"
                  :to="`/store/product/hosting/domain/${route.params['product_id']}/price/create`"
                  class="btn btn-success"
                  type="button">
            <svg class="bi">
                <use xlink:href="#circle-plus"/>
            </svg>

            Create
        </NuxtLink>

        <ModalDelete v-if="cellSelected && hasPerm('admin_store_product_price.delete_storeproductprice')"
                     :deleteFunction="<Function>deleteFunction"
                     :message-error="formErrors"
                     :params="{ id: cellParams?.['id'], product_id: route.params?.['product_id'] }"
                     message-alert="Continuing will remove this domain hosting price."
                     message-success="Domain hosting price has been removed."
                     :redirect="`/store/product/hosting/domain/${route.params?.['product_id']}/price`"/>

        <NuxtLink v-if="cellSelected && route.name == 'store-product-hosting-domain-product_id-price' && hasPerm('admin_store_product_price.change_storeproductprice')"
                  :to="`/store/product/hosting/domain/${route.params?.['product_id']}/price/${cellParams?.['id']}/edit`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Edit
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'store-product-hosting-domain-product_id-price' && hasPerm('admin_store_product_price.view_storeproductprice')"
                  class="btn btn-primary"
                  :to="`/store/product/hosting/domain/${route.params?.['product_id']}/price`"
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