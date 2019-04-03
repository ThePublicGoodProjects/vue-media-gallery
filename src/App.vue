<template>
    <div>
        <posts :per-page="4" campaign-slug="mental-health-champions">
            <template v-slot:header="slotData">
                <h2 class="title">{{slotData.title}}</h2>
            </template>
        </posts>
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
