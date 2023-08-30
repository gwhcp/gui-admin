<script lang="ts"
        setup>
import { number, object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { formObj, getEdit, updateProfile } = useCustomerBillingProfile();

const route = useRoute();

const schema = object({
    address: string().required(),
    city: string().required(),
    country: string().required(),
    credit_card_cvv2: string().required().min(3).max(4),
    credit_card_month: string().required().length(2),
    credit_card_year: string().required().length(4),
    name: string().required(),
    primary_phone: number().required().positive().integer(),
    state: string().required(),
    zipcode: string().required()
});

definePageMeta({
    description: 'Edit Billing Profile',
    title: 'Edit Billing Profile'
});

onMounted(() => {
    getEdit(route.params['billing_id'].toString());

    hasAccess('admin_customer_billing_profile.view_billingprofile');

    hasPermForm('admin_customer_billing_profile.change_billingprofile');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonCustomerBillingProfile/>

    <Form :validation-schema="schema"
          @submit="updateProfile">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormHidden v-model="route.params['billing_id']"
                                name="billing"/>

                    <StaticData :value="formObj['id']"
                                name="Profile ID"/>

                    <FormText v-model="formObj['name']"
                              :required="true"
                              help-text="Can be any name to help identify this profile"
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
                </div>
            </div>

            <div class="col">
                <div class="border rounded p-3">
                    <div class="mb-2">
                        <div class="fw-bold">Credit Card Type</div>

                        <svg class="bi">
                            <use v-if="formObj['credit_card_type'] === 'amex'"
                                 xlink:href="#cc-amex"/>

                            <use v-if="formObj['credit_card_type'] === 'discover'"
                                 xlink:href="#cc-discover"/>

                            <use v-if="formObj['credit_card_type'] === 'mastercard'"
                                 xlink:href="#cc-mastercard"/>

                            <use v-if="formObj['credit_card_type'] === 'visa'"
                                 xlink:href="#cc-visa"/>
                        </svg>
                    </div>

                    <StaticData :value="formObj['credit_card_name']"
                                name="Name on Credit Card"/>

                    <StaticData :value="formObj['credit_card_number']"
                                name="Credit Card Number"/>

                    <div class="row">
                        <div class="col-lg-6">
                            <FormText v-model="formObj['credit_card_month']"
                                      :required="true"
                                      label="Expiration Month"
                                      name="credit_card_month"/>
                        </div>

                        <div class="col-lg-6">
                            <FormText v-model="formObj['credit_card_year']"
                                      :required="true"
                                      label="Expiration Year"
                                      name="credit_card_year"/>
                        </div>
                    </div>

                    <FormText v-model="formObj['credit_card_cvv2']"
                              :required="true"
                              label="CVV2"
                              name="credit_card_cvv2"/>

                    <button class="btn btn-outline-primary px-4"
                            type="submit">
                        Update
                    </button>
                </div>
            </div>
        </div>
    </Form>
</template>

<style scoped>
.bi {
    display: inline-block;
    width: 2rem;
    height: 2rem;
}
</style>