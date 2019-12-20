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
             <posts
                     request-url="https://downloadcenter.actionminded.org"
                     :per-page="10"
                     :enable-filters="true"
                     campaign-slug="mental-health-champions"
                     share-url="https://share.downloadcenter.actionminded.org"
                     :enable-share="true"
                     :fields="{'text-content': false}"
             >
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

