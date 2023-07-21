<script lang="ts"
        setup>
const { convertDateTime } = useUtils();

const props = defineProps({
    ahref: {
        type: Object,
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
        <h6 class="fw-bold">{{ name }}</h6>

        <div v-if="value && !ahref">
            {{ text_left }} {{ value }} {{ text_right }}
        </div>

        <div v-if="datetime">
            {{ convertDateTime(datetime) }}
        </div>
    </div>
</template>

<style scoped>

</style>