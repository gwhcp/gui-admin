<script lang="ts"
        setup>
import { boolean, object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { choices, formObj, getChoices, getEdit, updateProfile } = useNetworkPool();

const route = useRoute();

const schema = object({
    assigned: string().required(),
    is_active: boolean(),
    name: string().required()
});

definePageMeta({
    description: 'Edit Network Pool',
    title: 'Edit Network Pool'
});

onMounted(() => {
    getChoices();

    getEdit(route.params['setup_id'].toString());

    hasAccess('admin_network_pool.view_ipaddresssetup');

    hasPermForm('admin_network_pool.change_ipaddresssetup');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonNetworkPool/>

    <Form :validation-schema="schema"
          @submit="updateProfile">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormHidden v-model="route.params['setup_id']"
                                name="setup"/>

                    <StaticData :value="formObj['ip_type']"
                                name="IP Address Type"/>

                    <StaticData :value="formObj['network']"
                                name="Network IP Address"/>

                    <StaticData :value="formObj['subnet']"
                                name="Subnet"/>

                    <StaticData v-if="formObj['ip_type'] === 4"
                                :value="formObj['netmask']"
                                name="Netmask"/>

                    <StaticData v-if="formObj['ip_type'] === 4"
                                :value="formObj['broadcast']"
                                name="Broadcast"/>

                    <StaticData :value="formObj['ip_total']"
                                name="Total IP Addresses"/>

                    <StaticData :value="formObj['ip_available']"
                                name="Available"/>

                    <FormText v-model="formObj['name']"
                              :required="true"
                              label="Name"
                              name="name"/>

                    <FormSelect v-model="formObj['assigned']"
                                :options="choices"
                                :required="true"
                                label="Assigned"
                                name="assigned"/>

                    <FormSwitch v-model="formObj['is_active']"
                                label="Status"
                                name="is_active"/>

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