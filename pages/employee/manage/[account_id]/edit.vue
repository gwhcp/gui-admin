<script lang="ts"
        setup>
import { number, object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { formObj, getProfile, updateProfile } = useEmployeeManage();

const route = useRoute();

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
    description: 'Edit Employee Account',
    title: 'Edit Employee Account'
});

onMounted(() => {
    getProfile(route.params['account_id'].toString());

    hasAccess('admin_employee_manage.view_account');

    hasPermForm('admin_employee_manage.change_account');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonEmployeeManage/>

    <Form :validation-schema="schema"
          @submit="updateProfile">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormHidden v-model="route.params['account_id']"
                                name="account"/>

                    <FormText v-model="formObj['first_name']"
                              :required="true"
                              label="First Name"
                              name="first_name"/>

                    <FormText v-model="formObj['last_name']"
                              :required="true"
                              label="Last Name"
                              name="last_name"/>

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

                    <FormText v-model="formObj['email']"
                              :required="true"
                              label="Email"
                              name="email"/>

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