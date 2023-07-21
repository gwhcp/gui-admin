<script lang="ts"
        setup>
const { data: auth } = useAuth();
</script>

<template>
    <li v-if="auth['has_perm']['admin_billing_payment.view_paymentgateway'] || auth['has_perm']['admin_billing_reason.view_reason']"
        class="nav-item">
        <button aria-expanded="false"
                class="nav-link d-flex align-items-center gap-2"
                data-bs-target="#billing-collapse"
                data-bs-toggle="collapse">
            <svg class="bi">
                <use xlink:href="#hand-holding-dollar"/>
            </svg>

            Billing
        </button>

        <div id="billing-collapse"
             class="collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li v-if="auth['has_perm']['admin_billing_payment.view_paymentgateway']"
                    class="ms-3"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/billing/payment">
                        <svg class="bi">
                            <use xlink:href="#credit-card"/>
                        </svg>

                        Payment Gateway
                    </NuxtLink>
                </li>

                <li v-if="auth['has_perm']['admin_billing_reason.view_reason']"
                    class="ms-3"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/billing/reason">
                        <svg class="bi">
                            <use xlink:href="#toilet-paper-slash"/>
                        </svg>

                        Reason
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