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
    },
    installFunction: {
        type: Function,
        required: false
    },
    formObj: {
        type: Object,
        required: false
    }
});

const route = useRoute();
</script>

<template>
    <div class="d-grid gap-2 d-md-flex mb-3">
        <NuxtLink v-if="route.name == 'hardware-client' && hasPerm('admin_hardware_client.add_server')"
                  class="btn btn-success"
                  to="/hardware/client/create"
                  type="button">
            <svg class="bi">
                <use xlink:href="#circle-plus"/>
            </svg>

            Create
        </NuxtLink>

        <ModalDelete v-if="cellSelected && !cellParams?.['in_queue'] && hasPerm('admin_hardware_client.delete_server')"
                     :deleteFunction="<Function>deleteFunction"
                     :message-error="formErrors"
                     :params="{ id: cellParams?.['id'] }"
                     message-alert="Continuing will remove this client hardware."
                     message-success="Client hardware has been removed."
                     redirect="/hardware/client"/>

        <NuxtLink v-if="cellSelected && !cellParams?.['in_queue'] && route.name !== 'hardware-client-server_id-edit' && hasPerm('admin_hardware_client.change_server')"
                  :to="`/hardware/client/${cellParams?.['id']}/edit`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Edit
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'hardware-client' && hasPerm('admin_hardware_client.view_server')"
                  class="btn btn-primary"
                  to="/hardware/client"
                  type="button">
            <svg class="bi">
                <use xlink:href="#magnifying-glass"/>
            </svg>

            Search
        </NuxtLink>

        <ModalInstall v-if="formObj && !formObj?.['is_installed'] && hasPerm('admin_hardware_client.change_server')"
                      :installFunction="<Function>installFunction"
                      :params="{ id: formObj?.['id'] }"
                      message-alert="Continuing will install this hardware."
                      message-error="Hardware installation failed."
                      message-success="Hardware has been scheduled for installation."
                      redirect="/hardware/client"/>
    </div>
</template>

<style scoped>
.bi {
    display: inline-block;
    width: 1rem;
    height: 1rem;
}
</style>