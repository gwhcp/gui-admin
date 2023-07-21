<script lang="ts"
        setup>
import { boolean, object } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { formObj, getProfile, updateProfile } = useStoreFraud();

const route = useRoute();

const schema = object({
    is_active: boolean()
});

definePageMeta({
    description: 'Edit Fraud String',
    title: 'Edit Fraud String'
});

onMounted(() => {
    getProfile(route.params['fraud_id'].toString());

    hasAccess('admin_store_fraud.view_fraudstring');

    hasPermForm('admin_store_fraud.change_fraudstring');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonStoreFraud/>

    <Form :validation-schema="schema"
          @submit="updateProfile">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormHidden v-model="route.params['fraud_id']"
                                name="fraud"/>

                    <StaticData :value="formObj['name']"
                                name="Name"/>

                    <StaticData :value="formObj['fraud_type']"
                                name="Type"/>

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