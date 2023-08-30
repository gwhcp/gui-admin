<script lang="ts"
        setup>
const { convertDateTime } = useUtils();

const props = defineProps({
    ahref: {
        type: Object,
        required: false
    },
    currency: {
        type: String,
        required: false
    },
    datetime: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    permission: {
        type: String,
        required: false
    },
    payment_status: {
        type: String,
        required: false
    },
    product_type: {
        type: String,
        required: false
    },
    text_left: {
        type: null,
        required: false
    },
    text_right: {
        type: null,
        required: false
    },
    value: {
        type: null,
        required: false
    }
});
</script>

<template>
    <div class="mb-2">
        <div class="fw-bold">{{ name }}</div>

        <div v-if="value && !ahref">
            {{ text_left }} {{ value }} {{ text_right }}
        </div>

        <div v-if="datetime">
            {{ convertDateTime(datetime) }}
        </div>

        <div v-if="payment_status">
            <span v-if="payment_status === 'auth_capture'">Authorize & Capture</span>
            <span v-if="payment_status === 'refund'">Refund</span>
            <span v-if="payment_status === 'void'">Voided</span>
        </div>

        <div v-if="product_type">
            <span v-if="product_type === 'domain'">Domain Hosting</span>
            <span v-if="product_type === 'mail'">Mail Hosting</span>
            <span v-if="product_type === 'mysql'">MySQL Hosting</span>
            <span v-if="product_type === 'postgresql'">PostgreSQL Hosting</span>
            <span v-if="product_type === 'private'">Dedicated / Private Hosting</span>
        </div>

        <div v-if="currency">
            ${{ currency }}
        </div>
    </div>
</template>

<style scoped>

</style>