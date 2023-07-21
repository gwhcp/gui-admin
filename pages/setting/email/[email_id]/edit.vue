<script lang="ts"
        setup>
import { object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { choices, formObj, getChoices, getProfile, updateProfile } = useSettingEmail();

const route = useRoute();

const schema = object({
    body: string().required(),
    sender: string().required().email(),
    subject: string().required()
});

definePageMeta({
    description: 'Edit Email Template',
    title: 'Edit Email Template'
});

onMounted(() => {
    getChoices();

    getProfile(route.params['email_id'].toString());

    hasAccess('admin_setting_email.view_emailtemplate');

    hasPermForm('admin_setting_email.change_emailtemplate');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonSettingEmail/>

    <Form :validation-schema="schema"
          @submit="updateProfile">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormHidden v-model="route.params['email_id']"
                                name="email"/>

                    <StaticData :value="formObj['template_name']"
                                name="Template"/>

                    <FormText v-model="formObj['sender']"
                              :required="true"
                              label="Sender"
                              name="sender"/>

                    <FormText v-model="formObj['subject']"
                              :required="true"
                              label="Subject"
                              name="subject"/>

                    <FormWysiwyg v-model="formObj['body']"
                                 :required="true"
                                 label="Body"
                                 name="body"
                                 rows="10"/>

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