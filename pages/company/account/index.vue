<script lang="ts"
        setup>
import { number, object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { formObj, getEdit, updateProfile } = useCompanyAccount();

const route = useRoute();

const schema = object({
    address: string().required(),
    city: string().required(),
    country: string().required(),
    name: string().required(),
    primary_phone: number().required().positive().integer(),
    secondary_phone: number().positive().integer().nullable(),
    state: string().required(),
    zipcode: string().required()
});

definePageMeta({
    description: 'Company Profile',
    title: 'Company Profile'
});

onMounted(() => {
    getEdit();

    hasAccess('admin_company_account.view_company');

    hasPermForm('admin_company_account.change_company');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <Form :validation-schema="schema"
          @submit="updateProfile">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormText v-model="formObj['name']"
                              :required="true"
                              label="Name"
                              name="name"/>

                    <FormText v-model="formObj['address']"
                              :required="true"
                              label="Address"
                              name="address"/>

                    <FormText v-model="formObj['city']"
                              :required="true"
                              label="City"
                              name="city"/>

                    <FormSelectCountry v-model="formObj['country']"
                                       :required="true"
                                       label="Country"
                                       name="country"/>

                    <FormSelectState v-model="formObj['state']"
                                     :country="formObj['country']"
                                     :required="true"
                                     label="State"
                                     name="state"/>

                    <FormText v-model="formObj['zipcode']"
                              :required="true"
                              label="Zipcode"
                              name="zipcode"/>

                    <FormText v-model="formObj['primary_phone']"
                              :required="true"
                              label="Primary Phone"
                              name="primary_phone"/>

                    <FormText v-model="formObj['secondary_phone']"
                              :required="false"
                              label="Secondary Phone"
                              name="secondary_phone"/>

                    <button class="btn btn-outline-primary px-4"
                            type="submit">Update
                    </button>
                </div>
            </div>
        </div>
    </Form>
</template>

<style scoped>

</style>