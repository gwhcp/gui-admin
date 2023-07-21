<script lang="ts"
        setup>
const route = useRoute();

const { getApiTitle, getGuiUrl } = useUtils();

useHead({
    htmlAttrs: {
        lang: 'en'
    },
    link: [
        { rel: 'canonical', href: `${getGuiUrl()}${route.path}` },
        { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' }
    ],
    meta: [
        { name: 'description', content: `${route.meta['description']}` },
        { name: 'keywords', content: `${route.meta['keywords']}` },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:description', content: `${route.meta['description']}` },
        { property: 'og:url', content: `${getGuiUrl()}${route.path}` },
        { property: 'og:title', content: `${route.meta['title']} - ${getApiTitle()}` },
        { property: 'og:type', content: 'website' }
    ],
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - ${getApiTitle()}` : `${getApiTitle()}`;
    }
});
</script>

<template>
    <SvgLoad/>

    <LayoutHeader/>

    <div class="container-fluid">
        <div class="row">

            <LayoutSidebar/>

            <main class="col-md-9 ms-sm-auto col-lg-10">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h1 fs-5">{{ route.meta['title'] }}</h1>
                </div>

                <Alert/>

                <slot/>
            </main>
        </div>
    </div>
</template>

<style scoped>
main {
    flex-grow: 1;
    height: 100%;
}
</style>