import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import VueWebComponent from './components/Posts.vue';

const CustomElement = wrap(Vue, VueWebComponent);
window.customElements.define('mhc-gallery', CustomElement);
