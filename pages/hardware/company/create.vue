<script lang="ts"
        setup>
import { object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { choices, createHardware, formObj, getChoices } = useHardwareCompany();

const route = useRoute();

const schema = object({
    domain: string().required(),
    ip: string().required(),
    target_type: string().required()
});

definePageMeta({
    description: 'Create Company Hardware',
    title: 'Create Company Hardware'
});

onMounted(() => {
    getChoices();

    hasAccess('admin_hardware_company.view_server');

    hasPermForm('admin_hardware_company.add_server');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonHardwareCompany/>

    <Form :validation-schema="schema"
          @submit="createHardware">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormSelect v-model="formObj['domain']"
                                :options="choices['domain']"
                                :required="true"
                                label="Domain"
                                name="domain"/>

                    <FormText v-model="formObj['ip']"
                              :required="true"
                              label="IP Address"
                              name="ip"/>

                    <FormSelect v-model="formObj['target_type']"
                                :options="choices['hardware_target']"
                                :required="true"
                                label="Target"
                                name="target_type"/>

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