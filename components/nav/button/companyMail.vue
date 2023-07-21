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
        <NuxtLink v-if="route.name == 'company-mail-domain_id' && hasPerm('admin_company_mail.add_mail')"
                  :to="`/company/mail/${route.params['domain_id']}/create`"
                  class="btn btn-success"
                  type="button">
            <svg class="bi">
                <use xlink:href="#circle-plus"/>
            </svg>

            Create
        </NuxtLink>

        <ModalDelete v-if="cellSelected && hasPerm('admin_company_mail.delete_mail')"
                     :deleteFunction="<Function>deleteFunction"
                     :message-error="formErrors"
                     :params="{ id: cellParams?.['id'] }"
                     :redirect="`/company/mail/${route.params['domain_id']}`"
                     message-alert="Continuing will remove this mail account."
                     message-success="Mail account has been removed."/>

        <NuxtLink v-if="cellSelected && route.name !== 'company-mail-domain_id-edit' && hasPerm('admin_company_mail.change_mail')"
                  :to="`/company/mail/${route.params['domain_id']}/edit/${cellParams?.['id']}`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Edit
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'company-mail-domain_id' && hasPerm('admin_company_mail.view_mail')"
                  :to="`/company/mail/${route.params['domain_id']}`"
                  class="btn btn-primary"
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