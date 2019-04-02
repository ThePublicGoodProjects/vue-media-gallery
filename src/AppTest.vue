<template>
    <div id="mhcDownloadGallery">
        <posts host="http://downloadcenter.publicgoodprojects.lcl" :per-page="4" campaign-slug="mental-health-champions"></posts>
    </div>
</template>

<script>
    import Posts from './components/Posts.vue';

    export default {
        name      : 'mhcDownloadGallery',
        components: {
            Posts
        }
    };
</script>

<style>

</style>
