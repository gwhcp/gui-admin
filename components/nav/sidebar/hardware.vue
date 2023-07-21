<script lang="ts"
        setup>
const { data: auth } = useAuth();
</script>

<template>
    <li v-if="auth['has_perm']['admin_hardware_client.view_server'] || auth['has_perm']['admin_hardware_company.view_server']"
        class="nav-item mt-1">
        <button aria-expanded="false"
                class="nav-link d-flex align-items-center gap-2"
                data-bs-target="#hardware-collapse"
                data-bs-toggle="collapse">
            <svg class="bi">
                <use xlink:href="#wrench"/>
            </svg>

            Hardware
        </button>

        <div id="hardware-collapse"
             class="collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li v-if="auth['has_perm']['admin_hardware_client.view_server']"
                    class="ms-3"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/hardware/client">
                        <svg class="bi">
                            <use xlink:href="#floppy-disk"/>
                        </svg>

                        Client
                    </NuxtLink>
                </li>

                <li v-if="auth['has_perm']['admin_hardware_company.view_server']"
                    class="ms-3"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/hardware/company">
                        <svg class="bi">
                            <use xlink:href="#hard-drive"/>
                        </svg>

                        Company
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </li>
</template>

<style scoped>
.bi {
    display: inline-block;
    width: 1rem;
    height: 1rem;
}

.nav-link {
    font-size: .875rem;
    font-weight: 500;
}

.nav .nav-item .nav-link {
    color: #000000;
}

.nav .nav-item .nav-link:hover {
    color: #FE541F;
}

/* Nav Bar */
.navbar-nav .nav-item .nav-link {
    color: #000000;
}

.navbar-nav .nav-item .nav-link:hover {
    color: #FE541F;
}
</style>