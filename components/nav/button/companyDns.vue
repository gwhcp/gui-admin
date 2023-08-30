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
        <NuxtLink v-if="hasPerm('admin_company_domain.view_domain')"
                  to="/company/domain"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#fingerprint"/>
            </svg>

            Domains
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'company-dns-domain_id-create' && hasPerm('admin_company_dns.add_dnszone')"
                  :to="`/company/dns/${route.params['domain_id']}/create`"
                  class="btn btn-success"
                  type="button">
            <svg class="bi">
                <use xlink:href="#circle-plus"/>
            </svg>

            Create
        </NuxtLink>

        <ModalDelete v-if="cellSelected && hasPerm('admin_company_dns.delete_dnszone')"
                     :deleteFunction="<Function>deleteFunction"
                     :message-error="formErrors"
                     :params="{ id: cellParams?.['id'] }"
                     :redirect="`/company/dns/${route.params['domain_id']}`"
                     message-alert="Continuing will remove this record."
                     message-success="Record has been removed."/>

        <NuxtLink v-if="route.name !== 'company-dns-domain_id'"
                  :to="`/company/dns/${route.params['domain_id']}`"
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