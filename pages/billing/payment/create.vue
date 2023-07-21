<script lang="ts"
        setup>
import { object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { choices, createPayment, formObj, getChoices } = useBillingPayment();

const route = useRoute();

const schema = object({
    merchant: string().required()
});

definePageMeta({
    description: 'Create Payment Gateway',
    title: 'Create Payment Gateway'
});

onMounted(() => {
    getChoices();

    hasAccess('admin_billing_payment.view_paymentgateway');

    hasPermForm('admin_billing_payment.add_paymentgateway');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonBillingPayment/>

    <Form :validation-schema="schema"
          @submit="createPayment">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormSelect v-model="formObj['merchant']"
                                :options="choices['merchant']"
                                :required="true"
                                label="Merchant"
                                name="merchant"/>

                    <button class="btn btn-outline-success px-4"
                            type="submit">
                        Create
                    </button>
                </div>
            </div>
        </div>
    </Form>
</template>

<style scoped>

</style>