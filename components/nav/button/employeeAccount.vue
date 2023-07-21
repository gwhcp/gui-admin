<script lang="ts"
        setup>
const route = useRoute();
</script>

<template>
    <div class="d-grid gap-2 d-md-flex mb-3">
        <NuxtLink v-if="route.name !== 'employee-account-accesslog'"
                  class="btn btn-primary"
                  to="/employee/account/accesslog"
                  type="button">
            <svg class="bi">
                <use xlink:href="#circle-info"/>
            </svg>

            Access Log
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'employee-account-password'"
                  class="btn btn-primary"
                  to="/employee/account/password"
                  type="button">
            <svg class="bi">
                <use xlink:href="#lock"/>
            </svg>

            Change Password
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'employee-account'"
                  class="btn btn-primary"
                  to="/employee/account"
                  type="button">
            <svg class="bi">
                <use xlink:href="#address-card"/>
            </svg>

            Profile
        </NuxtLink>
    </div>
</template>

<style scoped>
.bi {
    display: inline-block;
    width: 1rem;
    height: 1rem;
}
</style>