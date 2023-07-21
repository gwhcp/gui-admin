<script lang="ts"
        setup>

</script>

<template>
    <header class="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <NuxtLink class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white"
                  to="/">
            <ImageLoad alt="GWHCP"
                       height="50"
                       src="logo.webp"
                       width="173"/>
        </NuxtLink>

        <ul class="navbar-nav flex-row d-md-none">
            <li class="nav-item text-nowrap">
                <button aria-controls="sidebarMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        class="nav-link px-3 text-white"
                        data-bs-target="#sidebarMenu"
                        data-bs-toggle="offcanvas"
                        type="button">
                    <svg class="bi mb-1">
                        <use xlink:href="#bars"/>
                    </svg>
                </button>
            </li>
        </ul>
    </header>
</template>

<style scoped>
.bi {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
}

.navbar {
    padding: .75rem 1rem;
}

.navbar-brand {
    padding-top: .75rem;
    padding-bottom: .75rem;
}
</style>