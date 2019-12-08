<template>
    <div class="post-item" :class="isVideo ? 'video' : ''">
        <div class="media-object stack-for-small" v-if="mode === 'grid'">
            <div class="media-object-section image cursor-pointer" @click="showModal()">
                <div class="thumbnail" :style="thumbStyle"></div>
            </div>
            <div class="media-object-section text">
                <h4 class="cursor-pointer post-title" @click="showModal()">{{ post.title }}</h4>
                <p class="post-tags">
                    <span @click="selectTag(tag)" :class="isSelected(tag) ? 'selected' : ''"
                          class="cursor-pointer label secondary rounded"
                          v-for="tag in post.tag_names" :key="tag">{{tag}}</span>
                </p>
                <p class="post-teaser" v-html="filterTeaser(post.body)" @click="showModal()"></p>
                <div class="post-clipboard" v-if="hasClipboard">
                    <copy-to-clipboard :content="post.clipboard"></copy-to-clipboard>
                </div>
                <div class="list-item-download">
                    <a target="_blank" :href="facebookShareUrl" v-if="facebookShareUrl"
                       class="button radius button-facebook">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a v-if="twitterShareUrl" target="_blank" :href="twitterShareUrl"
                       class="button radius button-twitter">
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
                            <span @click="selectTag(tag)" :class="isSelected(tag) ? 'selected' : ''"
                                  class="cursor-pointer label secondary rounded"
                                  v-for="tag in post.tag_names" :key="tag">{{tag}}</span>
                    </p>
                    <p v-if="hasBody" v-html="post.body" class="details-body" @click="showModal()"></p>
                    <div v-if="hasClipboard">
                        <copy-to-clipboard :content="post.clipboard"></copy-to-clipboard>
                    </div>
                </div>
            </div>
            <div class="list-item-download">
                <a target="_blank" :href="facebookShareUrl" v-if="facebookShareUrl"
                   class="button radius button-facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a v-if="twitterShareUrl" target="_blank" :href="twitterShareUrl"
                   class="button radius button-twitter">
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
    const isDevelopment = process.env.NODE_ENV === 'development';
    import CopyToClipboard from './CopyToClipboard';
    import $ from 'jquery';

    export default {
        name      : "PostItem",
        components: {
            CopyToClipboard
        },
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
            }
        },
        data() {
            let data = {
                    twitterShareUrl : '',
                    facebookShareUrl: ''
                },
                shareUrl;

            if (this.enableShare && this.shareUrl.length) {
                shareUrl = [this.shareUrl, 'assets', this.post.campaign_id, this.post.id].join('/');

                data.facebookShareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + shareUrl;
                data.twitterShareUrl = 'https://twitter.com/intent/tweet?url=' + shareUrl;
            }
            return data;
        },
        created() {
        },
        mounted() {
        },
        computed  : {
            downloadUrl   : function () {
                return this.requestUrl + (this.post.url ? this.post.url : '/download/' + this.post.file);
            },
            thumbStyle    : function () {
                let path = this.post.thumbnail_path || this.post.file_path;
                return 'background-image: url(' + path + ')';
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
