<script lang="ts"
        setup>
const { data: auth } = useAuth();
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
                              to="/employee/manage">
                        <svg class="bi">
                            <use xlink:href="#address-card"/>
                        </svg>

                        Account
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