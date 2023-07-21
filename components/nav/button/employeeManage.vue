<script lang="ts"
        setup>
const { hasPerm } = useAuthorization();

const props = defineProps({
    cellParams: {
        type: Object,
        required: false
    },
    cellSelected: {
        type: Boolean,
        required: false
    },
    deleteFunction: {
        type: Function,
        required: false
    },
    formErrors: {
        type: Object,
        required: false
    }
});

const route = useRoute();
</script>

<template>
    <div class="d-grid gap-2 d-md-flex mb-3">
        <NuxtLink v-if="route.name !== 'employee-manage' && route.name !== 'employee-manage-create' && route.name !== 'employee-manage-account_id-accesslog' && hasPerm('admin_employee_manage.view_accesslog')"
                  :to="`/employee/manage/${route.params?.['account_id']}/accesslog`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#circle-info"/>
            </svg>

            Access Log
        </NuxtLink>

        <NuxtLink v-if="route.name == 'employee-manage' && hasPerm('admin_employee_manage.add_account')"
                  class="btn btn-success"
                  to="/employee/manage/create"
                  type="button">
            <svg class="bi">
                <use xlink:href="#circle-plus"/>
            </svg>

            Create
        </NuxtLink>

        <ModalDelete v-if="cellSelected && hasPerm('admin_employee_manage.delete_account')"
                     :deleteFunction="<Function>deleteFunction"
                     :message-error="formErrors"
                     :params="{ id: cellParams?.['id'] }"
                     :redirect="`/employee/manage/${route.params['account_id']}`"
                     message-alert="Continuing will remove this employee account."
                     message-success="Employee account has been removed."/>

        <NuxtLink v-if="cellSelected && route.name !== 'employee-manage-account_id-edit' && hasPerm('admin_employee_manage.change_account')"
                  :to="`/employee/manage/${cellParams?.['id']}/edit`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Edit
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'employee-manage' && route.name !== 'employee-manage-create' && route.name !== 'employee-manage-account_id-edit' && hasPerm('admin_employee_manage.change_account')"
                  :to="`/employee/manage/${route.params?.['account_id']}/edit`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Edit
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'employee-manage' && route.name !== 'employee-manage-create' && route.name !== 'employee-manage-account_id-permission' && hasPerm('admin_employee_manage.change_account')"
                  :to="`/employee/manage/${route.params?.['account_id']}/permission`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#key"/>
            </svg>

            Permissions
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'employee-manage' && hasPerm('admin_employee_manage.view_account')"
                  class="btn btn-primary"
                  to="/employee/manage"
                  type="button">
            <svg class="bi">
                <use xlink:href="#magnifying-glass"/>
            </svg>

            Search
        </NuxtLink>
    </div>
</template>

<style scoped>
.bi {
    display: inline-block;
    width: 1rem;
    height: 1rem;
}
</style>