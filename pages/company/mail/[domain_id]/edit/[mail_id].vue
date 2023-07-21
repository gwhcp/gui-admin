<script lang="ts"
        setup>
import { number, object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { formObj: domainObj, getProfile: getDomainProfile } = useCompanyDomain();

const { choices, formObj, getChoices, getProfile, updateProfile } = useCompanyMail();

const route = useRoute();

const schema = object({
    account: number().required(),
    forward_to: string().email(),
    quota: number().integer()
});

definePageMeta({
    description: 'Edit Mail Account',
    title: 'Edit Mail Account'
});

onMounted(() => {
    getChoices();

    getDomainProfile(route.params['domain_id'].toString());

    getProfile(route.params['domain_id'].toString(), route.params['mail_id'].toString());

    hasAccess('admin_company_mail.view_mail');

    hasPermForm('admin_company_mail.change_mail');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonCompanyMail/>

    <h2 class="fs-5 mb-3">{{ domainObj['name'] }}</h2>

    <Form :validation-schema="schema"
          @submit="updateProfile">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormHidden v-model="route.params['domain_id']"
                                name="domain"/>

                    <FormHidden v-model="route.params['mail_id']"
                                name="id"/>

                    <StaticData :value="formObj['mail_type_name']"
                                name="Type"/>

                    <StaticData :value="formObj['name']"
                                name="Name"/>

                    <FormSelect v-model="formObj['account']"
                                :options="choices['account']"
                                :required="true"
                                label="Account"
                                name="account"/>

                    <FormText v-if="formObj['mail_type'] === 'forward'"
                              v-model="formObj['forward_to']"
                              :required="true"
                              label="Forward To"
                              name="forward_to"/>

                    <FormText v-if="formObj['mail_type'] === 'mailbox'"
                              v-model="formObj['quota']"
                              :required="true"
                              label="Quota"
                              name="quota"/>

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