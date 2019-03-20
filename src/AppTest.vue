<template>
    <div id="mhcDownloadGallery">
        <!--<Posts campaign="mental-health-champions" host="https://downloadcenter.actionminded.org" />-->
        <Posts :options="data"/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Posts from './components/Posts.vue';
    import _ from 'lodash';

    let defaults = {
        host         : 'http://downloadcenter.publicgoodprojects.lcl',
        perPage      : 10,
        enableOptions: true,
        campaign     : 'mental-health-champions',
    };

    export default {
        name      : 'mhcDownloadGallery',
        components: {
            Posts
        },
        props     : {
            options: Object
        },
        data() {
            let data = _.extend({}, defaults, this.options);
            return {
                data: data
            };
        },
        mounted() {
        }
    };
</script>

<style>

</style>
