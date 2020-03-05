<template>
    <div>
        <!--<posts-->
                <!--imgix="https://pgpdownloadcenter.imgix.net"-->
                <!--imgix-params="ar=1:1&w=400&fit=crop"-->
                <!--request-url="https://downloadcenter.actionminded.org"-->
                <!--:per-page="10"-->
                <!--:enable-filters="false"-->
                <!--campaign-slug="mental-health-champions"-->
                <!--share-url="https://share.downloadcenter.actionminded.org"-->
                <!--:enable-share="true"-->
                <!--:fields="{'text-content': false}"-->
        <!--&gt;-->
        <posts imgix="https://pgpdownloadcenter.imgix.net"
               imgix-params="w=500&fit=crop"
               campaign-slug="mental-health-champions"
               share-url="https://share.actionminded.org"
               grid-container="small-up-2 grid-view"
               :fields="{'text-content': false}"
               :enable-share="true" :per-page="12">
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

