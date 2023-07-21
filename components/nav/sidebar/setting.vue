<script lang="ts"
        setup>
const { data: auth } = useAuth();
</script>

<template>
    <li v-if="auth['has_perm']['admin_setting_banned.view_banned'] || auth['has_perm']['admin_setting_email.view_emailtemplate'] || auth['has_perm']['admin_setting_permission.view_permission']"
        class="nav-item mt-1">
        <button aria-expanded="false"
                class="nav-link d-flex align-items-center gap-2"
                data-bs-target="#setting-collapse"
                data-bs-toggle="collapse">
            <svg class="bi">
                <use xlink:href="#gears"/>
            </svg>

            Setting
        </button>

        <div id="setting-collapse"
             class="collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li v-if="auth['has_perm']['admin_setting_banned.view_banned']"
                    class="ms-3"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/setting/banned">
                        <svg class="bi">
                            <use xlink:href="#ban"/>
                        </svg>

                        Banned
                    </NuxtLink>
                </li>

                <li v-if="auth['has_perm']['admin_setting_email.view_emailtemplate']"
                    class="ms-3"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/setting/email">
                        <svg class="bi">
                            <use xlink:href="#folder-tree"/>
                        </svg>

                        Email Template
                    </NuxtLink>
                </li>

                <li v-if="auth['has_perm']['admin_setting_permission.view_permission']"
                    class="ms-3"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/">
                        <svg class="bi">
                            <use xlink:href="#user-secret"/>
                        </svg>

                        Permission
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