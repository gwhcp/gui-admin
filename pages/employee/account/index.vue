<script lang="ts"
        setup>
import { number, object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { choices, formObj, getChoices, getEdit, updateProfile } = useEmployeeAccount();

const route = useRoute();

const schema = object({
    address: string().required(),
    city: string().required(),
    comment_order: string().required(),
    country: string().required(),
    email: string().required().email(),
    first_name: string().required(),
    last_name: string().required(),
    primary_phone: number().required().positive().integer(),
    secondary_phone: number().positive().integer().nullable(),
    state: string().required(),
    time_format: number().positive().integer().required(),
    time_zone: string().required(),
    zipcode: string().required()
});

definePageMeta({
    description: 'Employee Profile',
    title: 'Employee Profile'
});

onMounted(() => {
    getChoices();

    getEdit();

    hasAccess('admin_employee_account.view_account');

    hasPermForm('admin_employee_account.change_account');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonEmployeeAccount/>

    <Form :validation-schema="schema"
          @submit="updateProfile">
        <div class="row row-cols-1 row-cols-lg-2 g-3 mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <StaticData :value="formObj['id']"
                                name="Account ID"/>

                    <StaticData :datetime="formObj['date_from']"
                                name="Created Date"/>

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
                </div>
            </div>

            <div class="col">
                <div class="border rounded p-3">
                    <FormSelect v-model="formObj['comment_order']"
                                :options="choices['comment']"
                                :required="true"
                                label="Comment Order"
                                name="comment_order"/>

                    <FormSelect v-model="formObj['time_format']"
                                :options="choices['timeformat']"
                                :required="true"
                                label="Time Format"
                                name="time_format"/>

                    <FormSelect v-model="formObj['time_zone']"
                                :options="choices['timezone']"
                                :required="true"
                                label="Time Zone"
                                name="time_zone"/>

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