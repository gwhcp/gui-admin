<script lang="ts"
        setup>
const props = defineProps({
    alt: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: false
    },
    height: {
        type: String,
        required: false
    },
    loading: {
        type: String,
        required: false
    },
    src: {
        type: String,
        required: true
    },
    width: {
        type: String,
        required: false
    }
});

const images: any = {
    'logo.webp': [
        'https://s6.imgcdn.dev/v95XC.webp',
        'logo.webp'
    ],
    'logo2.webp': [
        'https://s6.imgcdn.dev/v9y2S.webp',
        'logo2.webp'
    ],
    'le/logo.webp': [
        'https://s6.imgcdn.dev/vPbPB.webp',
        'le/logo.webp'
    ],
    'cc_types.webp': [
        'https://s6.imgcdn.dev/vPFka.webp',
        'cc_types.webp'
    ]
};

const image = ref(images[props.src][0]);

const getImage = async () => {
    const response = await fetch(`${images[props.src][0]}`);

    if (response.ok) {
        image.value = images[props.src][0];
    } else {
        image.value = `/img/${images[props.src][1]}`;
    }

    return image.value;
};

onMounted(() => {
    getImage();
});

useHead({
    link: [
        { rel: 'preload', as: 'image', href: image.value }
    ]
});
</script>

<template>
    <img :alt="props.alt"
         :class="props.class"
         :height="props.height"
         :loading="props.loading"
         :src="image"
         :width="props.width"/>
</template>

<style scoped>

</style>