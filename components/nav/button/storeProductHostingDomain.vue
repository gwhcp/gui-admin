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

        <NuxtLink v-if="route.name == 'store-product-hosting-domain' && hasPerm('admin_store_product.add_storeproduct')"
                  class="btn btn-success"
                  to="/store/product/hosting/domain/create"
                  type="button">
            <svg class="bi">
                <use xlink:href="#circle-plus"/>
            </svg>

            Create
        </NuxtLink>

        <ModalDelete v-if="cellSelected && hasPerm('admin_store_product.delete_storeproduct')"
                     :deleteFunction="<Function>deleteFunction"
                     :message-error="formErrors"
                     :params="{ id: cellParams?.['id'] }"
                     message-alert="Continuing will remove this hosting product."
                     message-success="Hosting product has been removed."
                     redirect="/store/product/hosting/domain"/>

        <NuxtLink v-if="cellSelected && route.name !== 'store-product-hosting-domain-product_id-edit' && hasPerm('admin_store_product.change_storeproduct')"
                  :to="`/store/product/hosting/domain/${cellParams?.['id']}/edit`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Edit
        </NuxtLink>

        <NuxtLink v-if="route.name === 'store-product-hosting-domain-product_id-resource' && hasPerm('admin_store_product.change_storeproduct')"
                  :to="`/store/product/hosting/domain/${route.params?.['product_id']}/edit`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Edit
        </NuxtLink>

        <NuxtLink v-if="route.name === 'store-product-hosting-domain-product_id-edit' && hasPerm('admin_store_product.change_storeproduct')"
                  :to="`/store/product/hosting/domain/${route.params?.['product_id']}/resource`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Resources
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'store-product-hosting-domain' && route.name !== 'store-product-hosting-domain-create' && hasPerm('admin_store_product_price.view_storeproductprice')"
                  :to="`/store/product/hosting/domain/${route.params?.['product_id']}/price`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#magnifying-glass"/>
            </svg>

            Prices
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'store-product-hosting-domain' && hasPerm('admin_store_product.view_storeproduct')"
                  class="btn btn-primary"
                  to="/store/product/hosting/domain"
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