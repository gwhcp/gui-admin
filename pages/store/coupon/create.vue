<script lang="ts"
        setup>
import { boolean, object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { createCoupon, formObj } = useStoreCoupon();

const route = useRoute();

const schema = object({
    amount: string().required(),
    is_active: boolean(),
    name: string().required()
});

definePageMeta({
    description: 'Create Coupon',
    title: 'Create Coupon'
});

onMounted(() => {
    hasAccess('admin_store_coupon.view_coupon');

    hasPermForm('admin_store_coupon.add_coupon');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonStoreCoupon/>

    <Form :validation-schema="schema"
          @submit="createCoupon">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormText v-model="formObj['name']"
                              :required="true"
                              label="Name"
                              name="name"
                              v-on:change="formObj['name'].toLowerCase()"/>

                    <FormText v-model="formObj['amount']"
                              :required="true"
                              label="Amount"
                              name="amount"/>

                    <FormSwitch v-model="formObj['is_active']"
                                label="Active"
                                name="is_active"/>

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