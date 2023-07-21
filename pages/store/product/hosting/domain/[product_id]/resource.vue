<script lang="ts"
        setup>
import { number, object } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { formObj, getResource, updateResource } = useStoreHostingDomain();

const route = useRoute();

const schema = object({
    bandwidth: number().required().integer(),
    cron_tab: number().required().integer(),
    diskspace: number().required().integer(),
    domain: number().required().integer(),
    ftp_user: number().required().integer(),
    ipaddress: number().when('ipaddress_type', { is: 'dedicated', then: (schema) => schema.required().integer() }),
    mail_account: number().when('has_mail', { is: true, then: (schema) => schema.required().integer() }),
    mail_list: number().when('has_mail', { is: true, then: (schema) => schema.required().integer() }),
    mysql_database: number().when('has_mysql', { is: true, then: (schema) => schema.required().integer() }),
    mysql_user: number().when('has_mysql', { is: true, then: (schema) => schema.required().integer() }),
    postgresql_database: number().when('has_postgresql', { is: true, then: (schema) => schema.required().integer() }),
    postgresql_user: number().when('has_postgresql', { is: true, then: (schema) => schema.required().integer() }),
    sub_domain: number().required().integer()
});

definePageMeta({
    description: 'Edit Domain Hosting Resources',
    title: 'Edit Domain Hosting Resources'
});

onMounted(() => {
    getResource(route.params['product_id'].toString());

    hasAccess('admin_store_product.view_storeproduct');

    hasPermForm('admin_store_product.change_storeproduct');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <div class="alert alert-warning"
         role="alert">
        If a customer product is associated to this store product then resources can only be upgraded.
    </div>

    <NavButtonStoreProductHostingDomain/>

    <Form :validation-schema="schema"
          @submit="updateResource">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormHidden v-model="route.params['product_id']"
                                name="product"/>

                    <FormHidden v-model="formObj['ipaddress_type']"
                                name="ipaddress_type"/>

                    <FormHidden v-model="formObj['has_mail']"
                                name="has_mail"/>

                    <FormHidden v-model="formObj['has_mysql']"
                                name="has_mysql"/>

                    <FormHidden v-model="formObj['has_postgresql']"
                                name="has_postgresql"/>

                    <FormText v-model="formObj['bandwidth']"
                              :required="true"
                              label="Bandwidth"
                              name="bandwidth"/>

                    <FormText v-model="formObj['diskspace']"
                              :required="true"
                              label="Diskspace"
                              name="diskspace"/>

                    <FormText v-model="formObj['domain']"
                              :required="true"
                              label="Domain"
                              name="domain"/>

                    <FormText v-model="formObj['sub_domain']"
                              :required="true"
                              label="Sub.Domain"
                              name="sub_domain"/>

                    <FormText v-model="formObj['ftp_user']"
                              :required="true"
                              label="FTP User"
                              name="ftp_user"/>

                    <FormText v-if="formObj['has_cron']"
                              v-model="formObj['cron_tab']"
                              :required="true"
                              label="Cron Tab"
                              name="cron_tab"/>

                    <FormText v-if="formObj['ipaddress_type'] === 'dedicated'"
                              v-model="formObj['ipaddress']"
                              :required="true"
                              label="IP Address"
                              name="ipaddress"/>

                    <FormText v-if="formObj['has_mail']"
                              v-model="formObj['mail_account']"
                              :required="true"
                              label="Mail Account"
                              name="mail_account"/>

                    <FormText v-if="formObj['has_mail']"
                              v-model="formObj['mail_list']"
                              :required="true"
                              label="Mailing List"
                              name="mail_list"/>

                    <FormText v-if="formObj['has_mysql']"
                              v-model="formObj['mysql_database']"
                              :required="true"
                              label="MySQL Database"
                              name="mysql_database"/>

                    <FormText v-if="formObj['has_mysql']"
                              v-model="formObj['mysql_user']"
                              :required="true"
                              label="MySQL User"
                              name="mysql_user"/>

                    <FormText v-if="formObj['has_postgresql']"
                              v-model="formObj['postgresql_database']"
                              :required="true"
                              label="PostgreSQL Database"
                              name="postgresql_database"/>

                    <FormText v-if="formObj['has_postgresql']"
                              v-model="formObj['postgresql_user']"
                              :required="true"
                              label="PostgreSQL User"
                              name="postgresql_user"/>

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