<script lang="ts"
        setup>
import { number, object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { choices, createPool, formObj, getChoices } = useNetworkPool();

const route = useRoute();

const schema = object({
    assigned: string().required(),
    name: string().required(),
    network: string().required(),
    subnet: number().required().positive().integer()
});

definePageMeta({
    description: 'Create Network Pool',
    title: 'Create Network Pool'
});

onMounted(() => {
    getChoices();

    hasAccess('admin_network_pool.view_ipaddresssetup');

    hasPermForm('admin_network_pool.add_ipaddresssetup');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonNetworkPool/>

    <Form :validation-schema="schema"
          @submit="createPool">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormText v-model="formObj['name']"
                              :required="true"
                              label="Name"
                              name="name"/>

                    <FormText v-model="formObj['network']"
                              :required="true"
                              label="Network"
                              name="network"/>

                    <FormText v-model="formObj['subnet']"
                              :required="true"
                              label="Subnet"
                              name="subnet"/>

                    <FormSelect v-model="formObj['assigned']"
                                :options="choices"
                                :required="true"
                                label="Assigned"
                                name="assigned"/>

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