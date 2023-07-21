<script lang="ts"
        setup>
import { boolean, object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { choices, createProduct, formObj, getChoices } = useStoreHostingDomain();

const route = useRoute();

const schema = object({
    has_cron: boolean(),
    has_mail: boolean(),
    has_mysql: boolean(),
    has_postgresql: boolean(),
    ipaddress_type: string().required(),
    name: string().required()
});

definePageMeta({
    description: 'Create Domain Hosting Product',
    title: 'Create Domain Hosting Product'
});

onMounted(() => {
    getChoices();

    hasAccess('admin_store_product.view_storeproduct');

    hasPermForm('admin_store_product.add_storeproduct');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonStoreProductHostingDomain/>

    <Form :validation-schema="schema"
          @submit="createProduct">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormText v-model="formObj['name']"
                              :required="true"
                              label="Name"
                              name="name"/>

                    <FormSwitch v-model="formObj['has_cron']"
                                label="Cron"
                                name="has_cron"/>

                    <FormSwitch v-model="formObj['has_mail']"
                                label="Mail"
                                name="has_mail"/>

                    <FormSwitch v-model="formObj['has_mysql']"
                                label="MySQL"
                                name="has_mysql"/>

                    <FormSwitch v-model="formObj['has_postgresql']"
                                class-name="mb-3"
                                label="PostgreSQL"
                                name="has_postgresql"/>

                    <FormSelect v-model="formObj['ipaddress_type']"
                                :options="choices['ip_type']"
                                :required="true"
                                label="IP Address Type"
                                name="ipaddress_type"/>

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