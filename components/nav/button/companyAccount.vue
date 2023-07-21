<script lang="ts"
        setup>
const route = useRoute();
</script>

<template>
    <div class="d-grid gap-2 d-md-flex mb-3">
        <NuxtLink v-if="route.name !== 'company-account'"
                  class="btn btn-primary"
                  to="/company/account"
                  type="button">
            Profile
        </NuxtLink>
    </div>
</template>

<style scoped>

</style>