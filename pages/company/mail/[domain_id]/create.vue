<script lang="ts"
        setup>
import { number, object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { formObj: domainObj, getEdit } = useCompanyDomain();

const { choices, createMail, formObj, getChoices } = useCompanyMail();

const route = useRoute();

const schema = object({
    account: number().required(),
    forward_to: string().when('mail_type', { is: 'forward', then: (schema) => schema.email().required() }),
    mail_type: string().required(),
    name: string().required(),
    password: string().when('mail_type', { is: 'mailbox', then: (schema) => schema.min(5).required() }),
    quota: number().integer().when('mail_type', { is: 'mailbox', then: (schema) => schema.required() })
});

definePageMeta({
    description: 'Create Mail Account',
    title: 'Create Mail Account'
});

onMounted(() => {
    getChoices();

    getEdit(route.params['domain_id'].toString());

    hasAccess('admin_company_mail.view_mail');

    hasPermForm('admin_company_mail.add_mail');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonCompanyMail/>

    <h2 class="fs-5 mb-3">{{ domainObj['name'] }}</h2>

    <Form :validation-schema="schema"
          @submit="createMail">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormHidden v-model="route.params['domain_id']"
                                name="domain"/>

                    <FormSelect v-model="formObj['account']"
                                :options="choices['account']"
                                :required="true"
                                label="Account"
                                name="account"/>

                    <FormSelect v-model="formObj['mail_type']"
                                :options="choices['type']"
                                :required="true"
                                label="Type"
                                name="mail_type"/>

                    <FormText v-model="formObj['name']"
                              :required="true"
                              label="Name"
                              name="name"/>

                    <FormText v-if="formObj['mail_type'] === 'forward'"
                              v-model="formObj['forward_to']"
                              :required="true"
                              label="Forward To"
                              name="forward_to"/>

                    <FormText v-if="formObj['mail_type'] === 'mailbox'"
                              v-model="formObj['password']"
                              :required="true"
                              label="Password"
                              name="password"
                              type="password"/>

                    <FormText v-if="formObj['mail_type'] === 'mailbox'"
                              v-model="formObj['quota']"
                              :required="true"
                              label="Quota"
                              name="quota"/>

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