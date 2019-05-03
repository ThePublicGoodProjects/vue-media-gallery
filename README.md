# @pgp/vue-media-gallery

[![NPM](https://nodei.co/npm/@pgp/vue-media-gallery.png)](https://nodei.co/npm/@pgp/vue-media-gallery/)

## Installation

### NPM
Install the package
```js
$ npm i @pgp/vue-media-gallery --save
```

Register the component.
- ES5
```js
var Gallery = require('@pgp/vue-media-gallery');
Vue.component('posts', Gallery.Posts)
```

- ES6
```js
import Gallery from '@pgp/vue-media-gallery'
Vue.component('posts', Gallery.Posts)

<!-- or import the Posts component -->
import {Posts} from '@pgp/vue-media-gallery'
Vue.component('posts', Posts)
```

- Browser
```js
new Vue({
    el        : '#app',                 // Vue app element
    components: {
        posts: pgpVueMediaGallery.Posts // Global component loaded from unpkg.com CDN
    }
});


```


### CDN

Include the source file.
```html
<!-- use the latest release -->
<script src="https://unpkg.com/@pgp/vue-media-gallery@latest"></script>
<!-- or use the specify version -->
<script src="https://unpkg.com/@pgp/vue-media-gallery@0.0.1"></script>
```

## Usage

### In Vue Template
```html
<posts
    campaign-slug="nj-sugarfreed">
</posts>
```

*Note*: In vue template, camelCase and kebab-case are both supported. For example, you can either use prop `page-count` or `pageCount`. They are leading to the same result.

Register the component.
```js
Vue.component('posts', PgpVueMediaGallery.Posts)
```

## Props

| Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type | Description | Default |
| ----------------- | :--- | :--- | :--- |
| `request-url`      | `String` |  Origin URL the request to the PGP Download Center host environment. | `https://downloadcenter.publicgoodprojects.org` |
| `:per-page`      | `Number` | Number of items to return per page.| `10` |
| `campaign-slug`      | `String` | Campaign slug name to select the campaign-specific assets.| `''` |
| `client-id`      | `String` | Client id to select the client-specific assets.| `''` |
| `:enable-filters`      | `Boolean` | Display filtering options.|`false` |


