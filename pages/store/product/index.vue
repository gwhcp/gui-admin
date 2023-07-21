<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const route = useRoute();

definePageMeta({
    description: 'Store Products',
    title: 'Store Products'
});

onMounted(() => {
    hasAccess('admin_store_product.view_storeproduct');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <div class="pb-2 border-bottom mb-3 fs-3 fw-semibold">
        Hosting
    </div>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mb-5">
        <NuxtLink class="link-underline link-underline-opacity-0"
                  to="/store/product/hosting/domain">
            <div class="col d-flex align-items-start">
                <svg class="bi flex-shrink-0 me-3 mt-1 link-dark">
                    <use xlink:href="#globe"/>
                </svg>

                <div class="fw-bold mb-0 fs-4 text-body-emphasis link-success">
                    Domain Hosting
                </div>
            </div>
        </NuxtLink>

        <NuxtLink class="link-underline link-underline-opacity-0"
                  to="/">
            <div class="col d-flex align-items-start">
                <svg class="bi flex-shrink-0 me-3 mt-1 link-dark">
                    <use xlink:href="#at"/>
                </svg>

                <div class="fw-bold mb-0 fs-4 text-body-emphasis link-success">
                    Mail Hosting
                </div>
            </div>
        </NuxtLink>

        <NuxtLink class="link-underline link-underline-opacity-0"
                  to="/">
            <div class="col d-flex align-items-start">
                <svg class="bi flex-shrink-0 me-3 mt-1 link-dark">
                    <use xlink:href="#database"/>
                </svg>

                <div class="fw-bold mb-0 fs-4 text-body-emphasis link-success">
                    MySQL Hosting
                </div>
            </div>
        </NuxtLink>

        <NuxtLink class="link-underline link-underline-opacity-0"
                  to="/">
            <div class="col d-flex align-items-start">
                <svg class="bi flex-shrink-0 me-3 mt-1 link-dark">
                    <use xlink:href="#database"/>
                </svg>

                <div class="fw-bold mb-0 fs-4 text-body-emphasis link-success">
                    PostgreSQL Hosting
                </div>
            </div>
        </NuxtLink>
    </div>

    <div class="pb-2 border-bottom mb-3 fs-3 fw-semibold">
        Server
    </div>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mb-5">
        <NuxtLink class="link-underline link-underline-opacity-0"
                  to="/">
            <div class="col d-flex align-items-start">
                <svg class="bi flex-shrink-0 me-3 mt-1 link-dark">
                    <use xlink:href="#server"/>
                </svg>

                <div class="fw-bold mb-0 fs-4 text-body-emphasis link-success">
                    Dedicated Server
                </div>
            </div>
        </NuxtLink>

        <NuxtLink class="link-underline link-underline-opacity-0"
                  to="/">
            <div class="col d-flex align-items-start">
                <svg class="bi flex-shrink-0 me-3 mt-1 link-dark">
                    <use xlink:href="#server"/>
                </svg>

                <div class="fw-bold mb-0 fs-4 text-body-emphasis link-success">
                    Private Server
                </div>
            </div>
        </NuxtLink>
    </div>

    <div class="pb-2 border-bottom mb-3 fs-3 fw-semibold">
        Miscellaneous
    </div>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mb-5">
        <NuxtLink class="link-underline link-underline-opacity-0"
                  to="/">
            <div class="col d-flex align-items-start">
                <svg class="bi flex-shrink-0 me-3 mt-1 link-dark">
                    <use xlink:href="#tag"/>
                </svg>

                <div class="fw-bold mb-0 fs-4 text-body-emphasis link-success">
                    Promo Codes
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<style scoped>
.bi {
    vertical-align: -.125em;
    width: 1.75rem;
    height: 1.75rem;
}
</style>