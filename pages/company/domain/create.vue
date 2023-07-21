<script lang="ts"
        setup>
import { object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { formObj, createDomain } = useCompanyDomain();

const route = useRoute();

const schema = object({
    name: string().required()
});

definePageMeta({
    description: 'Create Company Domain',
    title: 'Create Company Domain'
});

onMounted(() => {
    hasAccess('admin_company_domain.view_domain');

    hasPermForm('admin_company_domain.add_domain');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonCompanyDomain/>

    <Form :validation-schema="schema"
          @submit="createDomain">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormText v-model="formObj['name']"
                              :required="true"
                              label="Name"
                              name="name"/>

                    <button class="btn btn-outline-success px-4"
                            type="submit">Create
                    </button>
                </div>
            </div>
        </div>
    </Form>
</template>

<style scoped>

</style>