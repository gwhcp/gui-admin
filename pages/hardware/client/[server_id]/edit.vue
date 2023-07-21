<script lang="ts"
        setup>
import { boolean, object } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { formObj, getProfile, installHardware, installSuccess, updateProfile } = useHardwareClient();

const route = useRoute();

const schema = object({
    is_active: boolean()
});

definePageMeta({
    description: 'Edit Client Hardware',
    title: 'Edit Client Hardware'
});

onMounted(() => {
    getProfile(route.params['server_id'].toString());

    hasAccess('admin_hardware_client.view_server');

    hasPermForm('admin_hardware_client.change_server');
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

    <NavButtonHardwareClient :formObj="formObj"
                             :installFunction="installHardware"/>

    <Form :validation-schema="schema"
          @submit="updateProfile">
        <div class="row row-cols-1 row-cols-lg-2 g-3 mb-3">
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

            <div class="col">
                <div class="border rounded p-3">
                    <div class="mb-2">
                        <div class="fw-bold">Domain</div>

                        <div :class="(formObj['is_domain']) ? 'text-success' : 'text-danger'">
                            {{ formObj['is_domain'] ? 'Yes' : 'No' }}
                        </div>
                    </div>

                    <div class="mb-2">
                        <div class="fw-bold">Mail</div>

                        <div :class="(formObj['is_mail']) ? 'text-success' : 'text-danger'">
                            {{ formObj['is_mail'] ? 'Yes' : 'No' }}
                        </div>
                    </div>

                    <div class="mb-2">
                        <div class="fw-bold">MySQL</div>

                        <div :class="(formObj['is_mysql']) ? 'text-success' : 'text-danger'">
                            {{ formObj['is_mysql'] ? 'Yes' : 'No' }}
                        </div>
                    </div>

                    <div>
                        <div class="fw-bold">PostgreSQL</div>

                        <div :class="(formObj['is_postgresql']) ? 'text-success' : 'text-danger'">
                            {{ formObj['is_postgresql'] ? 'Yes' : 'No' }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Form>
</template>

<style scoped>

</style>