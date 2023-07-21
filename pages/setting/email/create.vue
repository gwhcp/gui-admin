<script lang="ts"
        setup>
import { object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { choices, createEmail, formObj, getChoices } = useSettingEmail();

const route = useRoute();

const schema = object({
    body: string().required(),
    sender: string().required().email(),
    subject: string().required(),
    template: string().required()
});

definePageMeta({
    description: 'Create Email Template',
    title: 'Create Email Template'
});

onMounted(() => {
    getChoices();

    hasAccess('admin_setting_email.view_emailtemplate');

    hasPermForm('admin_setting_email.add_emailtemplate');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonSettingEmail/>

    <Form :validation-schema="schema"
          @submit="createEmail">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormText v-model="formObj['sender']"
                              :required="true"
                              label="Sender"
                              name="sender"/>

                    <FormSelect v-model="formObj['template']"
                                :options="choices"
                                :required="true"
                                label="Template"
                                name="template"/>

                    <FormText v-model="formObj['subject']"
                              :required="true"
                              label="Subject"
                              name="subject"/>

                    <FormWysiwyg v-model="formObj['body']"
                                 :required="true"
                                 rows="10"
                                 label="Body"
                                 name="body"/>

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