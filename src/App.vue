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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
