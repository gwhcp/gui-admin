<script lang="ts"
        setup>
import { number, object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { formObj: formBillingProfileObj, getEdit: getBillingProfile } = useCustomerBillingProfile();

const { choices, formObj, fraudArr, getChoices, getEdit, getFraud, updateOrder } = useCustomerOrder();

const route = useRoute();

const schema = object({
    order: number().required(),
    payment_status: string().required()
});

definePageMeta({
    description: 'Edit Customer Order',
    title: 'Edit Customer Order'
});

onMounted(async () => {
    await getChoices();

    await getEdit(route.params['order_id'].toString());

    await getBillingProfile(formObj.value['billing_profile']['id'].toString());

    await getFraud(formObj.value['fraud_string']);

    hasAccess('admin_customer_order.view_order');

    hasPermForm('admin_customer_order.change_order');
});

useHead({
    title: `${route.meta['title']}`
});

/**
 * Modifies the given choices based on the status value.
 *
 * @param {any} choices - The choices to be modified.
 * @param {string} status - The status value to determine the modification.
 * @returns {any} - The modified choices.
 */
const useChoices = (choices: any, status: string): any => {
    if (status && status !== 'new') {
        delete choices['new'];
    }

    return choices;
};
</script>

<template>
    <NavButtonCustomerOrder/>

    <Form :validation-schema="schema"
          @submit="updateOrder">
        <div class="row row-cols-1 row-cols-lg-2 g-3 mb-3">
            <div class="col">
                <div class="border rounded p-3 mb-3">
                    <FormHidden v-model="route.params['order_id']"
                                name="order"/>

                    <FormHidden v-model="formObj['payment_status']"
                                name="payment_status"/>

                    <StaticData :value="route.params['order_id']"
                                name="Order ID"/>

                    <StaticData :datetime="formObj['date_from']"
                                name="Date"/>

                    <StaticData :payment_status="formObj['payment_status']"
                                name="Payment Status"/>

                    <FormSelect v-model="formObj['status']"
                                :options="useChoices(choices['order_status'], formObj['status'])"
                                :required="true"
                                label="Status"
                                name="status"/>

                    <button v-if="formObj['status'] != 'new'"
                            class="btn btn-outline-primary px-4"
                            type="submit">Update
                    </button>
                </div>

                <div class="border rounded p-3 mb-3">
                    <StaticData :value="formObj['product_profile']['id']"
                                name="Product ID"/>

                    <StaticData :value="formObj['billing_invoice']['store_product']['name']"
                                name="Name"/>

                    <StaticData :product_type="formObj['billing_invoice']['store_product']['product_type']"
                                name="Product Type"/>

                    <StaticData :value="formObj['billing_invoice']['store_product_price']['billing_cycle']"
                                name="Cycle"/>

                    <StaticData :currency="formObj['billing_invoice']['store_product_price']['base_price']"
                                name="Base Price"/>

                    <StaticData :currency="formObj['billing_invoice']['store_product_price']['setup_price']"
                                name="Setup Price"/>

                    <StaticData v-if="formObj['coupon']"
                                :currency="formObj['coupon']['amount']"
                                name="Coupon Price"/>

                    <StaticData v-if="formObj['coupon']"
                                :currency="(Number(formObj['billing_invoice']['store_product_price']['base_price']) + Number(formObj['billing_invoice']['store_product_price']['setup_price']) - Number(formObj['coupon']['amount'])).toFixed(2).toString()"
                                name="Total Price"/>

                    <StaticData v-if="!formObj['coupon']"
                                :currency="(Number(formObj['billing_invoice']['store_product_price']['base_price']) + Number(formObj['billing_invoice']['store_product_price']['setup_price'])).toFixed(2).toString()"
                                name="Total Price"/>
                </div>

                <div v-if="fraudArr.length > 0"
                     class="border rounded p-3">
                    <table class="table table-hover caption-top table-striped">
                        <caption class="fw-bold">Fraud Strings</caption>

                        <thead v-if="fraudArr.length > 0"
                               class="table-light border-top border-bottom border-dark border-2 border-start-0 border-end-0">
                        <tr>
                            <th scope="col"
                                style="width: 50%;">Name
                            </th>
                            <th scope="col"
                                style="width: 50%;">Type
                            </th>
                        </tr>
                        </thead>

                        <tbody v-if="fraudArr.length > 0">
                        <tr v-for="item in fraudArr"
                            v-bind:key="item">
                            <td>{{ item['name'] }}</td>
                            <td>{{ item['fraud_type'] }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="col">
                <div class="border rounded p-3 mb-3">
                    <StaticData :value="formObj['account']['id']"
                                name="Account ID"/>

                    <StaticData :value="`${formObj['account']['first_name']} ${formObj['account']['last_name']}`"
                                name="Name"/>

                    <StaticData :value="formObj['account']['address']"
                                name="Address"/>

                    <StaticData :value="formObj['account']['city']"
                                name="City"/>

                    <StaticData v-if="formObj['account']['country'] === 'US'"
                                :value="formObj['account']['state']"
                                name="State"/>

                    <StaticData :value="formObj['account']['country']"
                                name="Country"/>

                    <StaticData :value="formObj['account']['zipcode']"
                                name="Zipcode"/>

                    <StaticData :value="formObj['account']['primary_phone']"
                                name="Primary Phone"/>

                    <StaticData v-if="formObj['account']['secondary_phone']"
                                :value="formObj['account']['secondary_phone']"
                                name="Secondary Phone"/>

                    <StaticData :value="formObj['account']['email']"
                                name="Email"/>
                </div>

                <div class="border rounded p-3">
                    <StaticData :value="formObj['billing_profile']['id'] "
                                name="Billing Profile ID"/>

                    <StaticData :value="formBillingProfileObj['name']"
                                name="Name"/>

                    <StaticData :value="formBillingProfileObj['address']"
                                name="Address"/>

                    <StaticData :value="formBillingProfileObj['city']"
                                name="City"/>

                    <StaticData v-if="formBillingProfileObj['country'] === 'US'"
                                :value="formBillingProfileObj['state']"
                                name="State"/>

                    <StaticData :value="formBillingProfileObj['country']"
                                name="Country"/>

                    <StaticData :value="formBillingProfileObj['zipcode']"
                                name="Zipcode"/>

                    <StaticData :value="formBillingProfileObj['primary_phone']"
                                name="Primary Phone"/>

                    <div class="mb-2">
                        <div class="fw-bold">Credit Card Type</div>

                        <svg class="bi">
                            <use v-if="formBillingProfileObj['credit_card_type'] === 'amex'"
                                 xlink:href="#cc-amex"/>

                            <use v-if="formBillingProfileObj['credit_card_type'] === 'discover'"
                                 xlink:href="#cc-discover"/>

                            <use v-if="formBillingProfileObj['credit_card_type'] === 'mastercard'"
                                 xlink:href="#cc-mastercard"/>

                            <use v-if="formBillingProfileObj['credit_card_type'] === 'visa'"
                                 xlink:href="#cc-visa"/>
                        </svg>
                    </div>

                    <StaticData :value="formBillingProfileObj['credit_card_name']"
                                name="Name on Credit Card"/>

                    <StaticData :value="formBillingProfileObj['credit_card_number']"
                                name="Credit Card Number"/>
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