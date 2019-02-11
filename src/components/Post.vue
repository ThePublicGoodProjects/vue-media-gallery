<template>
    <div class="post-item" :class="isVideo ? 'video' : ''">
        <div class="media-object stack-for-small" v-if="mode === 'grid'">
            <div class="media-object-section image cursor-pointer" @click="showModal()">
                <div class="thumbnail" :style="thumbStyle"></div>
            </div>
            <div class="media-object-section text">
                <h4 class="cursor-pointer" @click="showModal()">{{ post.title }}</h4>
                <p>
                    <span @click="selectTag(tag)" :class="isSelected(tag) ? 'selected' : ''" class="cursor-pointer label secondary rounded"
                          v-for="tag in post.tag_names" :key="tag">{{tag}}</span>
                </p>
                <p v-html="filterTeaser(post.body)" @click="showModal()"></p>
                <div class="list-item-download">
                    <a v-if="enableFacebook" href="" class="button radius button-facebook" @click.prevent="shareFacebook()">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a v-if="enableTwitter" :href="'https://twitter.com/intent/tweet?text=' + post.file_path" class="button radius button-twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a class="button button-download radius" @click="download(post)" :href="downloadUrl"
                       :data-ga-label="post.file_path" title="download">
                        <i class="fas fa-download"></i>
                    </a>
                </div>
            </div>
        </div>
        <div v-if="mode === 'list'" class="list-item">
            <div class="list-item-selector">
                <label class="container">
                    <input type="checkbox" v-model="isChecked">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="list-item-content">
                <div class="thumbnail cursor-pointer" @click="showModal()" :style="thumbStyle"></div>
                <div class="details">
                    <div class="title">
                        <h4 v-if="hasTitle" class="cursor-pointer" @click="showModal()">{{ post.title }}</h4>
                    </div>
                    <p v-if="hasTags">
                            <span @click="selectTag(tag)" :class="isSelected(tag) ? 'selected' : ''" class="cursor-pointer label secondary rounded"
                                  v-for="tag in post.tag_names" :key="tag">{{tag}}</span>
                    </p>
                    <p v-if="hasBody" v-html="post.body" class="details-body" @click="showModal()"></p>
                </div>
            </div>
            <div class="list-item-download">
                <a v-if="enableFacebook" href="" class="button radius button-facebook" @click.prevent="shareFacebook()">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a v-if="enableTwitter" :href="'https://twitter.com/intent/tweet?text=' + post.file_path" class="button radius button-twitter">
                    <i class="fab fa-twitter"></i>
                </a>
                <a class="button button-download radius" @click="download(post)" :href="downloadUrl"
                   :data-ga-label="post.file_path" title="download">
                    <i class="fas fa-download"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable no-unused-vars, no-undef */
    const $ = require('jquery'),
          _ = require('lodash');

    export default {
        name      : "PostItem",
        components: {},
        props     : {
            mode       : {
                type   : String,
                default: 'list'
            },
            post       : {
                type: Object
            },
            enabledTags: {
                type: Array
            },
            isChecked  : {
                type   : Boolean,
                default: false
            },
            host: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                enableFacebook: false,
                enableTwitter: false
            };
        },
        created() {
        },
        mounted() {
        },
        computed  : {
            downloadUrl   : function () {
                return this.host + (this.post.url ? this.post.url : '/download/' + this.post.file);
            },
            thumbStyle    : function () {
                return 'background-image: url(' + this.post.thumbnail_path + ')';
            },
            isVideo       : function () {
                return this.post.file_type === 'video';
            },
            hasTags       : function () {
                return this.post.tag_names && this.post.tag_names.length;
            },
            hasTitle      : function () {
                return this.post.title && this.post.title.length;
            },
            hasBody       : function () {
                return this.post.body && this.post.body.length;
            },
            fileType      : function () {
                return this.post.file_type;
            },
            downloadButton: function () {
                if (this.isVideo) {
                    return 'Download Video';
                }

                return 'Download Image';
            }
        },
        watch     : {
            'isChecked': function (newValue) {
                this.$emit('checked', {id: this.post.id, checked: newValue});
            }
        },
        methods   : {
            filterTeaser: function (fullText) {
                if (fullText) {
                    let text = $(fullText.replace(/<br>/g, '\n')).text();
                    if (text.length > 140) {
                        return text.slice(0, 140).replace(/\r?\n/g, "<br />") + '... <a style="white-space: nowrap" :href.prevent="#">view more</a>';
                    }
                    return text;
                }

                return fullText;
            },
            download    : function (post) {
                this.$emit('download', post);
            },
            shareFacebook: function () {
                function shareOverrideOGMeta(overrideLink, overrideTitle, overrideDescription, overrideImage) {
                    FB.ui({
                            method           : 'share_open_graph',
                            action_type      : 'og.likes',
                            action_properties: JSON.stringify({
                                object: {
                                    'og:url'        : overrideLink,
                                    'og:title'      : overrideTitle,
                                    'og:description': overrideDescription,
                                    'og:image'      : overrideImage
                                }
                            })
                        },
                        function () {
                            // Action after response
                        });
                }
                shareOverrideOGMeta(location.origin, 'Mental Health Champions', this.post.body, this.post.file_path);
            },
            selectTag   : function (tag) {
                this.$emit('selectTag', tag);
            },
            showModal   : function () {
                this.$emit('showModal', this.post);
            },
            isSelected(name) {
                return _.indexOf(this.enabledTags, name) > -1;
            },
        },
    };
</script>

<style scoped>

</style>
