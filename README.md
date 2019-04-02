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
var MediaGallery = require('@pgp/vue-media-gallery');
Vue.component('posts', MediaGallery.Posts)
```

- ES6
```js
import MediaGallery from '@pgp/vue-media-gallery'
Vue.component('posts', MediaGallery.Posts)
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
    :options="{host: 'https://downloadcenter.njsugarfreed.org', perPage: 10, campaign: 'nj-sugarfreed'}">
    </posts>
```

*Note*: In vue template, camelCase and kebab-case are both supported. For example, you can either use prop `page-count` or `pageCount`. They are leading to the same result.

Register the component.
```js
Vue.component('posts', PgpVueMediaGallery.Posts)
```

## Props

| Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type | Default | Description |
| ----------------- | :--- | :--- | :--- |
| `request-url`      | `String` | '' |  **(required)** Origin URL the request to the PGP Download Center host environment.  |
| `per-page`      | `Number` | 10 | Number of items to return per page.|
| `enable-filters`      | `Boolean` | false | Display filtering options.|
| `campaign-slug`      | `String` | '' | Campaign slug name to select the campaign-specific assets.|
| `client-id`      | `String` | '' | Client id to select the client-specific assets.|


