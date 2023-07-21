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
        <NuxtLink v-if="route.name !== 'company-domain-create' && hasPerm('admin_company_domain.add_domain')"
                  class="btn btn-success"
                  to="/company/domain/create"
                  type="button">
            <svg class="bi">
                <use xlink:href="#circle-plus"/>
            </svg>

            Create
        </NuxtLink>

        <ModalDelete v-if="cellSelected && hasPerm('admin_company_domain.delete_domain')"
                     :deleteFunction="<Function>deleteFunction"
                     :message-error="formErrors"
                     :params="{ id: cellParams?.['id'] }"
                     message-alert="Continuing will remove this domain."
                     message-success="Domain has been removed."
                     redirect="/company/domain"/>

        <NuxtLink v-if="cellSelected && hasPerm('admin_company_dns.view_dnszone')"
                  :to="`/company/dns/${cellParams?.['id']}`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#signature"/>
            </svg>

            DNS
        </NuxtLink>

        <NuxtLink v-if="cellSelected && hasPerm('admin_company_mail.view_mail')"
                  :to="`/company/mail/${cellParams?.['id']}`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#at"/>
            </svg>

            Mail
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'company-domain' && hasPerm('admin_company_domain.view_domain')"
                  class="btn btn-primary"
                  to="/company/domain"
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