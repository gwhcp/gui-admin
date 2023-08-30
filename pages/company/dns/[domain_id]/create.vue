<script lang="ts"
        setup>
import { number, object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { formObj: domainObj, getEdit } = useCompanyDomain();

const { choices, createRecord, formObj, getChoices } = useCompanyDns();

const route = useRoute();

const schema = object({
    data: string().required(),
    host: string(),
    mx_priority: number().when('record_type', { is: 'MX', then: (schema) => schema.positive().integer().required() }),
    record_type: string().required()
});

definePageMeta({
    description: 'Create DNS Record',
    title: 'Create DNS Record'
});

onMounted(() => {
    getChoices();

    getEdit(route.params['domain_id'].toString());

    hasAccess('admin_company_dns.view_dnszone');

    hasPermForm('admin_company_dns.add_dnszone');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonCompanyDns/>

    <h2 class="fs-5 mb-3">{{ domainObj['name'] }}</h2>

    <Form :validation-schema="schema"
          @submit="createRecord">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormHidden v-model="route.params['domain_id']"
                                name="domain"/>

                    <FormText v-model="formObj['host']"
                              :required="false"
                              label="Host"
                              name="host"/>

                    <FormSelect v-model="formObj.record_type"
                                :options="choices.zone"
                                :required="true"
                                label="Type"
                                name="record_type"/>

                    <FormText v-if="formObj['record_type'] === 'MX'"
                              v-model="formObj['mx_priority']"
                              :required="true"
                              label="MX Priority"
                              name="mx_priority"/>

                    <FormText v-model="formObj['data']"
                              :required="true"
                              label="Data"
                              name="data"/>

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