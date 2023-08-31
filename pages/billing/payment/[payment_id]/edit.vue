<script lang="ts"
        setup>
import { boolean, object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { choices, formObj, getChoices, getEdit, updateProfile } = useBillingPayment();

const route = useRoute();

const schema = object({
    batch_out: string().required(),
    in_test_mode: boolean(),
    is_active: boolean(),
    login_id: string().required(),
    transaction_key: string().required()
});

definePageMeta({
    description: 'Edit Payment Gateway',
    title: 'Edit Payment Gateway'
});

onMounted(() => {
    getChoices();

    getEdit(route.params['payment_id'].toString());

    hasAccess('admin_billing_payment.view_paymentgateway');

    hasPermForm('admin_billing_payment.change_paymentgateway');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonBillingPayment/>

    <Form :validation-schema="schema"
          @submit="updateProfile">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormHidden v-model="route.params['payment_id']"
                                name="payment"/>

                    <StaticData :value="formObj['merchant_name']"
                                name="Merchant"/>

                    <FormText v-model="formObj['login_id']"
                              :required="true"
                              label="Login ID"
                              name="login_id"/>

                    <FormText v-model="formObj['transaction_key']"
                              :required="true"
                              label="Transaction Key"
                              name="transaction_key"/>

                    <FormText v-model="formObj['batch_out']"
                              :required="true"
                              label="Batch Out Time"
                              name="batch_out"/>

                    <FormSwitch v-model="formObj['in_test_mode']"
                                label="Test Mode"
                                name="in_test_mode"/>

                    <FormSwitch v-model="formObj['is_active']"
                                label="Status"
                                name="is_active"/>

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

</style>