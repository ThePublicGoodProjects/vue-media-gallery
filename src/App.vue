<template>
    <div>
        <posts :per-page="4" campaign-slug="mental-health-champions"></posts>
    </div>
</template>

<script>
    import Posts from './components/Posts.vue';

    export default {
        name      : 'pgpMediaGallery',
        components: {
            Posts
        }
    };
</script>

<style>

</style>
