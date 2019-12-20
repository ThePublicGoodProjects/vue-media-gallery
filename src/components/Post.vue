<template>
    <div class="post-item-container">
        <div class="post-item-selector" v-if="enableFilters">
            <label class="checkmark">
                <input type="checkbox" v-model="data.checked">
                <span class="placeholder"></span>
            </label>
        </div>
        <div class="post-item-content">
            <div class="post-item-image">
                <a @click="showModal">
                    <img class="thumbnail" :src="thumbPath"/>
                </a>
            </div>
            <div class="post-item-text" v-if="showField('text-content')">
                <h4 v-if="showField('title')" class="cursor-pointer post-title">{{ post.title }}</h4>
                <p class="post-tags" v-if="hasTags && showField('tags')">
                    <span @click="selectTag(tag)" :class="isSelected(tag) ? 'selected' : ''"
                          class="cursor-pointer label secondary rounded"
                          v-for="tag in post.tag_names" :key="tag">{{tag}}</span>
                </p>
                <p v-if="showField('teaser')" class="post-teaser" v-html="filterTeaser(post.body)"></p>
                <div v-if="hasClipboard && showField('clipboard')" class="post-clipboard">
                    <copy-to-clipboard :content="post.clipboard"></copy-to-clipboard>
                </div>
            </div>
            <div class="post-item-share" v-if="showField('share-links')">
                <div class="buttons">
                    <a v-if="facebookShareUrl" target="_blank" :href="facebookShareUrl"
                       class="button radius button-facebook">
                        Share <i class="fab fa-facebook-f"></i>
                    </a>
                    <a v-if="twitterShareUrl" target="_blank" :href="twitterShareUrl"
                       class="button radius button-twitter">
                        Share <i class="fab fa-twitter"></i>
                    </a>
                    <a class="button button-download radius" @click="download(post)" :href="downloadUrl"
                       :data-ga-label="post.file_path" title="download">
                        <i class="fas fa-download"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable no-unused-vars, no-undef */
    const isDevelopment = process.env.NODE_ENV === 'development';
    import CopyToClipboard from './CopyToClipboard';
    import $ from 'jquery';

    export default {
        name      : "PostItem",
        components: {
            CopyToClipboard
        },
        props     : {
            fields     : {
                type   : Object,
                default: function () {
                    return {};
                }
            },
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
            enableFilters: {
                type: Boolean,
                default: false
            },
            isChecked  : {
                type   : Boolean,
                default: false
            },
            requestUrl : {
                type   : String,
                default: ''
            },
            enableShare: {
                type   : Boolean,
                default: false
            },
            shareUrl   : {
                type   : String,
                default: ''
            },
            imgix: {
                type: String,
                default: false
            },
            imgixParams: {
                type   : String,
                default: false
            }
        },
        data() {
            let
                twitterShareUrl = '',
                facebookShareUrl = '',
                shareUrl;

            if (this.enableShare && this.shareUrl.length) {
                facebookShareUrl = this.$parent.getFacebookShareUrl(this.post);
                twitterShareUrl = this.$parent.getTwitterShareUrl(this.post);
            }
            return {
                twitterShareUrl : twitterShareUrl,
                facebookShareUrl: facebookShareUrl,
                data            : {
                    checked: this.isChecked
                }
            }
        },
        created() {
        },
        mounted() {
        },
        computed  : {
            downloadUrl   : function () {
                return this.requestUrl + (this.post.url ? this.post.url : '/download/' + this.post.uuid);
            },
            thumbStyle    : function () {
                let path = this.post.thumbnail_path || this.post.file_path;
                return 'background-image: url(' + path + ')';
            },
            thumbPath     : function () {
                if (this.imgix) {
                    let imgixParams = this.imgixParams.length ? '?' + this.imgixParams : '';
                    return this.imgix + '/' + (this.post.thumbnail || this.post.file) + imgixParams;
                }
                return this.post.thumbnail_path || this.post.file_path;
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
            hasClipboard  : function () {
                return this.post.clipboard && this.post.clipboard.length;
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
            'data.checked': function (newValue) {
                this.$emit('checked', {id: this.post.id, checked: newValue});
            },
            'isChecked'   : function (newValue) {
                this.data.checked = newValue;
            }
        },
        methods   : {
            showField(field) {
                if (field in this.fields) {
                    return this.fields[field] === true;
                }

                return true;
            },
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

<style scoped lang="scss">
</style>
