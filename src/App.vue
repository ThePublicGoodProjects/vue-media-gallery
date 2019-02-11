<template>
  <div id="mhcDownloadGallery">
    <Posts campaign="mental-health-champions" host="https://downloadcenter.actionminded.org" />
  </div>
</template>

<script>
import './assets/sass/app.scss';
import Posts from './components/Posts.vue'

export default {
  name: 'mhcDownloadGallery',
  components: {
    Posts
  },
  mounted() {
  }
}
</script>

<style>

</style>
