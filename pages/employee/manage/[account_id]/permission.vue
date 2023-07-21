<script lang="ts"
        setup>
import VueMultiselect from "vue-multiselect";

import { number, object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const {
    formObj,
    getPermissionsBase,
    getPermissionsUser,
    permissionsBase,
    permissionsUser,
    updatePermissions
} = useEmployeeManage();

const route = useRoute();

const selected: any = ref([]);

const schema = object({
    address: string().required(),
    city: string().required(),
    country: string().required(),
    email: string().required().email(),
    first_name: string().required(),
    last_name: string().required(),
    primary_phone: number().required().positive().integer(),
    secondary_phone: number().positive().integer().nullable(),
    state: string().required(),
    zipcode: string().required()
});

definePageMeta({
    description: 'Employee Permissions',
    title: 'Employee Permissions'
});

onMounted(() => {
    getPermissionsBase();

    getPermissionsUser(route.params['account_id'].toString());

    hasAccess('admin_employee_manage.view_account');

    hasPermForm('admin_employee_manage.change_permission');
});

useHead({
    title: `${route.meta['title']}`
});

watch([permissionsBase, permissionsUser], () => {
    permissionsUser.value.forEach((user) => {
        permissionsBase.value.forEach((base) => {
            // @ts-ignore
            if (base['value'] === user) {
                selected.value.push({
                    // @ts-ignore
                    value: base['value'],

                    // @ts-ignore
                    label: base['label']
                });
            }
        });
    });
});

const update = (selected: any) => {
    updatePermissions(route.params['account_id'].toString(), selected);
};
</script>

<template>
    <NavButtonEmployeeManage/>

    <Form @submit="update(selected)">
        <VueMultiselect v-model="selected"
                        :clear-on-select="false"
                        :close-on-select="false"
                        :multiple="true"
                        :options="permissionsBase"
                        label="label"
                        placeholder="Select Permissions"
                        track-by="value">
            <template v-slot:selection="params">
                            <span class="multiselect__single">
                                {{ params.values.length }} permissions selected out of {{ permissionsBase.length }}
                            </span>
            </template>
        </VueMultiselect>

        <button class="btn btn-outline-primary px-4 mt-3"
                type="submit">Update
        </button>
    </Form>
</template>

<style lang="scss">
@import "vue-multiselect/dist/vue-multiselect.css";
</style>