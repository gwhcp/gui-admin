<script lang="ts"
        setup>
const { data: auth } = useAuth();
</script>

<template>
    <li v-if="auth['has_perm']['admin_customer_account.view_account'] || auth['has_perm']['admin_customer_billing.view_billingprofile'] || auth['has_perm']['admin_customer_order.view_order'] || auth['has_perm']['admin_customer_product.view_product']"
        class="nav-item mt-1">
        <button aria-expanded="false"
                class="nav-link d-flex align-items-center gap-2"
                data-bs-target="#customer-collapse"
                data-bs-toggle="collapse">
            <svg class="bi">
                <use xlink:href="#users"/>
            </svg>

            Customer
        </button>

        <div id="customer-collapse"
             class="collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li v-if="auth['has_perm']['admin_customer_account.view_account']"
                    class="ms-3"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/">
                        <svg class="bi">
                            <use xlink:href="#user"/>
                        </svg>

                        Account
                    </NuxtLink>
                </li>

                <li v-if="auth['has_perm']['admin_customer_billing.view_billingprofile']"
                    class="ms-3"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/">
                        <svg class="bi">
                            <use xlink:href="#wallet"/>
                        </svg>

                        Billing Profile
                    </NuxtLink>
                </li>

                <li v-if="auth['has_perm']['admin_customer_order.view_order']"
                    class="ms-3"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/">
                        <svg class="bi">
                            <use xlink:href="#gifts"/>
                        </svg>

                        Order
                    </NuxtLink>
                </li>

                <li v-if="auth['has_perm']['admin_customer_product.view_product']"
                    class="ms-3"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/">
                        <svg class="bi">
                            <use xlink:href="#handshake"/>
                        </svg>

                        Product
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