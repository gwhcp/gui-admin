<script lang="ts"
        setup>
import { boolean, object } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { formObj, getProfile, installHardware, installSuccess, updateProfile } = useHardwareCompany();

const route = useRoute();

const schema = object({
    is_active: boolean()
});

definePageMeta({
    description: 'Edit Company Hardware',
    title: 'Edit Company Hardware'
});

onMounted(() => {
    getProfile(route.params['server_id'].toString());

    hasAccess('admin_hardware_company.view_server');

    hasPermForm('admin_hardware_company.change_server');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <div v-if="!formObj['is_installed'] && !formObj['in_queue'] && !installSuccess"
         class="alert alert-warning"
         role="alert">
        Hardware is not installed.
    </div>

    <NavButtonHardwareCompany :formObj="formObj"
                              :installFunction="installHardware"/>

    <Form :validation-schema="schema"
          @submit="updateProfile">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormHidden v-model="route.params['server_id']"
                                name="server"/>

                    <StaticData :value="formObj['hardware_type_name']"
                                name="Hardware"/>

                    <StaticData :value="formObj['domain_name']"
                                name="Domain"/>

                    <StaticData :value="formObj['ipaddress']"
                                name="IP Address"/>

                    <FormSwitch v-if="formObj['is_installed'] && !formObj['in_queue']"
                                v-model="formObj['is_active']"
                                label="Status"
                                name="is_active"/>

                    <button v-if="formObj['is_installed'] && !formObj['in_queue']"
                            class="btn btn-outline-primary px-4"
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