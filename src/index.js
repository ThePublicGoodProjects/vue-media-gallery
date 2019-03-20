
import Vue from '../node_modules/vue/dist/vue.js';
import Posts from './components/Posts.vue';

const Components = {
    Posts
};

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
});

export default Components;
