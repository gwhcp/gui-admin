<script lang="ts"
        setup>

</script>

<template>
    <li class="nav-item mt-1">
        <button aria-expanded="false"
                class="nav-link d-flex align-items-center gap-2"
                data-bs-target="#employee-collapse"
                data-bs-toggle="collapse">
            <svg class="bi">
                <use xlink:href="#user-tie"/>
            </svg>

            Employee
        </button>

        <div id="employee-collapse"
             class="collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li class="ms-3"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/employee/account">
                        <svg class="bi">
                            <use xlink:href="#address-card"/>
                        </svg>

                        Account
                    </NuxtLink>
                </li>

                <li class="ms-3"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/">
                        <svg class="bi">
                            <use xlink:href="#at"/>
                        </svg>

                        Mail
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </li>

    <li class="nav-item">
        <NuxtLink class="nav-link d-flex align-items-center gap-2"
                  to="/auth/logout">
            <svg class="bi">
                <use xlink:href="#right-from-bracket"/>
            </svg>

            Sign out
        </NuxtLink>
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