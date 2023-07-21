<script lang="ts"
        setup>
import { object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { choices, createBanned, formObj, getChoices } = useSettingBanned();

const route = useRoute();

const schema = object({
    banned_type: string().required(),
    name: string().required()
});

definePageMeta({
    description: 'Create Banned Item',
    title: 'Create Banned Item'
});

onMounted(() => {
    getChoices();

    hasAccess('admin_setting_banned.view_banned');

    hasPermForm('admin_setting_banned.add_banned');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonSettingBanned/>

    <Form :validation-schema="schema"
          @submit="createBanned">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormText v-model="formObj['name']"
                              :required="true"
                              label="Name"
                              name="name"/>

                    <FormSelect v-model="formObj['banned_type']"
                                :options="choices"
                                :required="true"
                                label="Type"
                                name="banned_type"/>

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