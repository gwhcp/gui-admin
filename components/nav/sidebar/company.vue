<script lang="ts"
        setup>
const { data: auth } = useAuth();
</script>

<template>
    <li v-if="auth['has_perm']['admin_company_account.view_company'] || auth['has_perm']['admin_company_domain.view_domain'] || auth['has_perm']['admin_company_dns.view_dnszone'] || auth['has_perm']['admin_company_mail.view_mail']"
        class="nav-item mt-1">
        <button aria-expanded="false"
                class="nav-link d-flex align-items-center gap-2"
                data-bs-target="#company-collapse"
                data-bs-toggle="collapse">
            <svg class="bi">
                <use xlink:href="#building"/>
            </svg>

            Company
        </button>

        <div id="company-collapse"
             class="collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li v-if="auth['has_perm']['admin_company_account.view_company']"
                    class="ms-3"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/company/account">
                        <svg class="bi">
                            <use xlink:href="#address-card"/>
                        </svg>

                        Account
                    </NuxtLink>
                </li>

                <li v-if="auth['has_perm']['admin_company_domain.view_domain']"
                    class="ms-3"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/company/domain">
                        <svg class="bi">
                            <use xlink:href="#fingerprint"/>
                        </svg>

                        Domain
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