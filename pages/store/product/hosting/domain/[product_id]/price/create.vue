<script lang="ts"
        setup>
import { number, object } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { createPrice, formObj } = useStorePrice();

const route = useRoute();

const schema = object({
    base_price: number().required(),
    billing_cycle: number().required().integer().positive(),
    setup_price: number().required()
});

definePageMeta({
    description: 'Create Domain Hosting Price',
    title: 'Create Domain Hosting Price'
});

onMounted(() => {
    hasAccess('admin_store_product_price.view_storeproductprice');

    hasPermForm('admin_store_product_price.add_storeproductprice');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonStoreProductHostingDomainPrice/>

    <Form :validation-schema="schema"
          @submit="createPrice">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormHidden name="product_type"
                                value="hosting/domain"/>

                    <FormHidden v-model="route.params['product_id']"
                                name="store_product"/>

                    <FormText v-model="formObj['billing_cycle']"
                              :required="true"
                              label="Billing Cycle"
                              name="billing_cycle"/>

                    <FormText v-model="formObj['base_price']"
                              :required="true"
                              label="Base Price"
                              name="base_price"/>

                    <FormText v-model="formObj['setup_price']"
                              :required="true"
                              label="Setup Price"
                              name="setup_price"/>

                    <button class="btn btn-outline-success px-4"
                            type="submit">
                        Create
                    </button>
                </div>
            </div>
        </div>
    </Form>
</template>

<style scoped>

</style>