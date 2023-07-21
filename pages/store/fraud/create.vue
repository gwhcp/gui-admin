<script lang="ts"
        setup>
import { object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { choices, createFraud, formObj, getChoices } = useStoreFraud();

const route = useRoute();

const schema = object({
    fraud_type: string().required(),
    name: string().required()
});

definePageMeta({
    description: 'Create Fraud String',
    title: 'Create Fraud String'
});

onMounted(() => {
    getChoices();

    hasAccess('admin_store_fraud.view_fraudstring');

    hasPermForm('admin_store_fraud.add_fraudstring');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonStoreFraud/>

    <Form :validation-schema="schema"
          @submit="createFraud">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormText v-model="formObj['name']"
                              :required="true"
                              label="Name"
                              name="name"/>

                    <FormSelect v-model="formObj['fraud_type']"
                                :options="choices"
                                :required="true"
                                label="Type"
                                name="fraud_type"/>

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