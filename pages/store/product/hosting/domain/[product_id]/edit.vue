<script lang="ts"
        setup>
import { boolean, object } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { formObj, getEdit, updateProfile } = useStoreHostingDomain();

const route = useRoute();

const schema = object({
    is_active: boolean()
});

definePageMeta({
    description: 'Edit Domain Hosting Product',
    title: 'Edit Domain Hosting Product'
});

onMounted(() => {
    getEdit(route.params['product_id'].toString());

    hasAccess('admin_store_product.view_storeproduct');

    hasPermForm('admin_store_product.change_storeproduct');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonStoreProductHostingDomain/>

    <Form :validation-schema="schema"
          @submit="updateProfile">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormHidden v-model="route.params['product_id']"
                                name="product"/>

                    <StaticData :value="formObj['name']"
                                name="Name"/>

                    <StaticData :value="formObj['hardware_type_name']"
                                name="Hardware Type"/>

                    <StaticData :value="formObj['product_type_name']"
                                name="Product Type"/>

                    <FormSwitch v-model="formObj['is_active']"
                                label="Status"
                                name="is_active"/>

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