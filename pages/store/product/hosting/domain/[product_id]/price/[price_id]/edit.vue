<script lang="ts"
        setup>
import { boolean, number, object } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { formObj, getEdit, updateProfile } = useStorePrice();

const route = useRoute();

const schema = object({
    base_price: number().required(),
    is_active: boolean(),
    is_hidden: boolean(),
    setup_price: number().required()
});

definePageMeta({
    description: 'Edit Domain Hosting Price',
    title: 'Edit Domain Hosting Price'
});

onMounted(() => {
    getEdit(route.params['price_id'].toString(), route.params['product_id'].toString());

    hasAccess('admin_store_product_price.view_storeproductprice');

    hasPermForm('admin_store_product_price.change_storeproductprice');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonStoreProductHostingDomainPrice/>

    <Form :validation-schema="schema"
          @submit="updateProfile">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormHidden v-model="route.params['price_id']"
                                name="price_id"/>

                    <FormHidden name="product_type"
                                value="hosting/domain"/>

                    <FormHidden v-model="route.params['product_id']"
                                name="store_product"/>

                    <StaticData :text_right="'Days(s)'"
                                :value="formObj['billing_cycle']"
                                name="Billing Cycle"/>

                    <FormText v-model="formObj['base_price']"
                              :required="true"
                              label="Base Price"
                              name="base_price"/>

                    <FormText v-model="formObj['setup_price']"
                              :required="true"
                              label="Setup Price"
                              name="setup_price"/>

                    <FormSwitch v-model="formObj['is_active']"
                                label="Status"
                                name="is_active"/>

                    <FormSwitch v-model="formObj['is_hidden']"
                                label="Hidden"
                                name="is_hidden"/>

                    <button class="btn btn-outline-primary px-4"
                            type="submit">
                        Update
                    </button>
                </div>
            </div>
        </div>
    </Form>
</template>

<style scoped>

</style>