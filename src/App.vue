<template>
    <div>
        <posts request-url="https://downloadcenter.publicgoodprojects.org" category="cessation"
                :per-page="4" :enable-filters="true" campaign-slug="healthier-future-wo">
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
