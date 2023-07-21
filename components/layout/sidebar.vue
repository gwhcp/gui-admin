<script lang="ts"
        setup>
const { data: auth } = useAuth();
</script>

<template>
    <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
        <div id="sidebarMenu"
             aria-labelledby="sidebarMenuLabel"
             class="offcanvas-lg offcanvas-end bg-body-tertiary"
             tabindex="-1">
            <div class="offcanvas-header">
                <ImageLoad id="sidebarMenuLabel"
                           alt="GWHCP"
                           class="offcanvas-title"
                           height="50"
                           src="logo2.webp"
                           width="168"/>
                <button aria-label="Close"
                        class="btn-close"
                        data-bs-dismiss="offcanvas"
                        data-bs-target="#sidebarMenu"
                        type="button"/>
            </div>

            <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto vh-100">
                <ul class="nav flex-column">
                    <NavSidebarBilling/>

                    <NavSidebarCompany/>

                    <NavSidebarCustomer/>

                    <NavSidebarEmployeeManage/>

                    <NavSidebarHardware/>

                    <NavSidebarNetwork/>

                    <NavSidebarSetting/>

                    <NavSidebarStore/>
                </ul>

                <hr class="my-3">

                <div class="ms-3 fw-semibold">
                    {{ auth['first_name'] }} {{ auth['last_name'] }}
                </div>

                <ul class="nav flex-column mb-auto">
                    <NavSidebarEmployee/>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (min-width: 768px) {
    .sidebar .offcanvas-lg {
        position: -webkit-sticky;
        position: sticky;
        top: 48px;
    }
}
</style>