<script lang="ts"
        setup>
import { object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { choices, createReason, formObj, getChoices } = useBillingReason();

const route = useRoute();

const schema = object({
    name: string().required(),
    reason_type: string().required()
});

definePageMeta({
    description: 'Create Billing Reason',
    title: 'Create Billing Reason'
});

onMounted(() => {
    getChoices();

    hasAccess('admin_billing_reason.view_reason');

    hasPermForm('admin_billing_reason.add_reason');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonBillingReason/>

    <Form :validation-schema="schema"
          @submit="createReason">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormText v-model="formObj['name']"
                              :required="true"
                              label="Name"
                              name="name"/>

                    <FormSelect v-model="formObj['reason_type']"
                                :options="choices"
                                :required="true"
                                label="Type"
                                name="reason_type"/>

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