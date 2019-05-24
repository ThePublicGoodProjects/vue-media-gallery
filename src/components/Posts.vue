<template>
    <div class="vue-media-gallery">

        <div class="posts" v-if="loaded">
            <div class="post-content">
                <slot name="header" :title="pageName"></slot>
                <div v-if="enableFilters" class="post-options">
                    <div class="callout radius primary">
                        <div class="margin-bottom-1">
                            <ul class="menu align-left">
                                <li v-if="hasCategories && enableCategories">
                                    <div>
                                        <label for="category">Category</label>
                                    </div>
                                    <select v-model="data.category" name="category" id="category">
                                        <option value="">All</option>
                                        <option :value="category.slug" v-for="category in categories" :key="category.id">{{ category.name }}</option>
                                    </select>
                                </li>
                                <li v-if="hasTypes">
                                    <div>
                                        <label for="type">File Type</label>
                                    </div>
                                    <select v-model="data.type" name="type" id="type">
                                        <option value="">All</option>
                                        <option :value="type" v-for="type in types" :key="type">{{ type }}</option>
                                    </select>
                                </li>
                                <li>
                                    <div>
                                        <label for="orderBy">Order By</label>
                                    </div>
                                    <select v-model="data.orderBy" name="orderBy" id="orderBy">
                                        <option :value="option.value" v-for="option in orderOptions" :key="option.id">{{ option.eng }}</option>
                                    </select>
                                </li>
                            </ul>
                        </div>
                        <div v-if="tags.length > 0">
                            <label>Tags:</label>
                            <div class="button-group small">
                                <button type="button" v-for="tag in tags" @click="selectTag(tag)" :key="tag" :class="isTagSelected(tag) ? 'selected' : ''"
                                        class="label rounded secondary">{{ tag
                                    }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="flex-container align-right">
                        <div v-if="listView">
                            <button v-if="hasSelectedPosts" type="button" title="Download Selected" class="button button-download-selected clear" @click="downloadSelectedPosts">
                                <i class="fas fa-download"></i> <span class="hide-for-small-only">Download Selected</span>
                            </button>
                            <button type="button" class="button clear" @click="selectAllPosts" title="Select All">
                                <i v-if="allPostsSelected" class="far fa-check-square"></i>
                                <i v-else class="far fa-square"></i>
                            </button>
                        </div>
                        <div class="view-mode-buttons">
                            <button @click="viewMode = 'grid'" :class="viewMode === 'grid' ? 'active' : ''" type="button" title="Gallery View" class="button clear cursor-pointer">
                                <i class="fas fa-th"></i>
                            </button>
                            <button @click="viewMode = 'list'" :class="viewMode === 'list' ? 'active' : ''" type="button" title="List View" class="button clear">
                                <i class="fas fa-th-list"></i>
                            </button>
                        </div>
                    </div>
                    <div class="text-right margin-right-1">Total: {{ pagination.total}}</div>
                </div>
                <div class="post-results margin-bottom-3">
                    <pagination :prevPage="prevPage" :nextPage="nextPage" :lastPage="lastPage" :firstPage="firstPage" :changePage="changePage" :settings="pagination"></pagination>
                    <div class="grid-x grid-padding-x" :class="viewModeClass" v-if="hasPosts">
                        <div class="cell post-card" v-for="post in posts" :key="post.id">
                            <post :mode="viewMode" :is-checked="isPostSelected(post.id)" @checked="checked" @selectTag="selectTag" @showModal="showModal" @download="download"
                                  :enabledTags="enabledTags"
                                  :post="post" :requestUrl="requestUrl"></post>
                        </div>
                    </div>
                    <pagination :prevPage="prevPage" :nextPage="nextPage" :lastPage="lastPage" :firstPage="firstPage" :changePage="changePage" :settings="pagination"></pagination>
                </div>
            </div>
            <div class="modal posts-modal micromodal-slide" id="posts-modal" aria-hidden="true">
                <div class="modal__overlay" tabindex="-1" data-micromodal-close>
                    <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="posts-modal-title">
                        <div class="flex-container align-right">
                            <button class="button clear modal-close" data-micromodal-close aria-label="Close this dialog window"><i class="fas fa-times" data-micromodal-close></i>
                            </button>
                        </div>
                        <main class="modal__content" id="posts-modal-content">
                            <div class="text-center">
                                <video v-if="modal.file_type === 'video' && modal.type === 'url'" controls>
                                    <source :src="videoSrc(modal.url)">
                                </video>
                                <video v-else-if="modal.file_type === 'video'" controls>
                                    <source :src="modal.file_path">
                                </video>
                                <img v-else :src="modal.image" alt="">
                            </div>
                            <div class="modal__title text-center" v-if="modal.title">{{ modal.title }}</div>
                            <div class="modal__body" v-if="modal.body" v-html="modal.body"></div>
                        </main>
                        <div class="text-center" v-if="modal.clipboard">
                            <copy-to-clipboard :content="modal.clipboard"></copy-to-clipboard>
                        </div>
                        <div class="text-center margin-top-1">
                            <a @click="download(modal)" class="button" :href="downloadUrl(modal)">Download</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable no-unused-vars */

    import $ from 'jquery';
    import axios from 'axios';
    import MicroModal from 'micromodal';
    import * as HashParams from '../js/hash-params';
    import CopyToClipboard from './CopyToClipboard';
    import Post from './Post';
    import Pagination from './Pagination';
    import _ from 'lodash';

    export default {
        name      : "Posts",
        components: {
            Post,
            Pagination,
            CopyToClipboard
        },
        props     : {
            requestUrl   : {
                type   : String,
                default: 'https://downloadcenter.publicgoodprojects.org'
            },
            perPage      : {
                type   : Number,
                default: 10
            },
            campaignSlug : {
                type: String
            },
            clientId     : {
                type: Number
            },
            category: {
                type: String
            },
            enableFilters: {
                type   : Boolean,
                default: false
            },
            enableCategories: {
                type: Boolean,
                default: true
            }


        },
        data() {
            return {
                orderOptions    : [
                    {
                        eng  : 'Most Recent',
                        value: 'new',
                    },
                    {
                        eng  : 'Oldest',
                        value: 'old'
                    }

                ],
                data            : {
                    orderBy : 'new',
                    category: '',
                    type    : '',
                    pageNum : 1,
                    perPage : this.perPage
                },
                downloadCategory: 'download',
                downloadAction  : location.pathname,
                posts           : [],
                client          : {},
                pagination      : {},
                tags            : [],
                enabledTags     : [],
                selectedPosts   : [],
                types           : [],
                categories      : [],
                modal           : {},
                viewMode        : 'grid',
                loaded          : false,
            };
        },
        created() {
        },
        mounted() {
            let url,
                skipLoad;
            this.params = {};
            if (this.campaignSlug) {
                this.url = this.requestUrl + '/api/campaigns/' + this.campaignSlug;
            } else if (this.clientId) {
                this.url = this.requestUrl + '/api/assets/' + this.clientId;
            }

            let hashVals = HashParams.parse();

            if (hashVals.viewMode) {
                this.viewMode = hashVals.viewMode;
            }


            if (hashVals.category) {
                this.data.category = hashVals.category;
                skipLoad = true;
            }
            if (hashVals.tags) {
                this.enabledTags = hashVals.tags;
            }
            if (hashVals.file_type) {
                this.data.type = hashVals.file_type;
                skipLoad = true;
            }
            if (hashVals.order) {
                this.data.orderBy = hashVals.orderBy === 'asc' ? 'old' : 'new';
                skipLoad = true;

            }

            if (hashVals.perPage) {
                this.data.perPage = hashVals.perPage;
            }

            if (this.category) {
                hashVals.category = this.category;
            }

            if (! skipLoad) {
                this.loadUrl(this.url, hashVals);
            }
        },
        computed  : {
            paginate        : function () {
                return this.pagination.last_page !== 1;
            },
            isCampaign      : function () {
                return !!this.campaignData;
            },
            pageName        : function () {
                return this.campaignData.name || '';
            },
            hasPosts        : function () {
                return this.posts && this.posts.length > 0;
            },
            hasTypes        : function () {
                return this.types && this.types.length > 1;
            },
            hasCategories   : function () {
                return this.categories && this.categories.length > 0;
            },
            listView        : function () {
                return this.viewMode === 'list';
            },
            gridView        : function () {
                return this.viewMode === 'grid';
            },
            viewModeClass   : function () {
                return this.gridView ? 'small-up-1 medium-up-2 large-up-2 grid-view' : 'small-up-1 list-view';
            },
            hasSelectedPosts: function () {
                return this.selectedPosts && this.selectedPosts.length;

            },
            allPostsSelected: function () {
                return this.selectedPosts && this.selectedPosts.length === this.posts.length;
            }
        },
        watch     : {
            'data.pageNum' : function (newValue, oldValue) {
                let pageNum = parseInt(newValue, 10),
                    url;
                if (!newValue.length) {
                    return;
                }
                if (pageNum >= 1 && pageNum <= this.pagination.last_page) {
                    if (pageNum < this.pagination.current_page) {
                        url = this.pagination.prev_page_url.replace(/page=([\d]+)/, function (a, b) {
                            return 'page=' + pageNum;
                        });
                        this.loadPage(url);
                    }
                    if (pageNum > this.pagination.current_page) {
                        url = this.pagination.next_page_url.replace(/page=([\d]+)/, function (a, b) {
                            return 'page=' + pageNum;
                        });
                        this.loadPage(url);
                    }
                    return;
                }

                this.data.pageNum = this.pagination.current_page;

            },
            'data.search'  : function (newValue, oldValue) {
                this.posts = _.filter(this.allPosts, function (n) {
                    var regex = new RegExp(newValue, 'i');
                    return !!n.body.match(regex);
                });
            },
            'data.category': function (newValue, oldValue) {
                this.params.category = newValue;
                this.loadUrl(this.params);
            },
            'data.orderBy' : function (newValue, oldValue) {
                if (newValue === 'new') {
                    this.params.order   = 'created_at';
                    this.params.orderBy = 'desc';
                } else if (newValue === 'old') {
                    this.params.order   = 'created_at';
                    this.params.orderBy = 'asc';
                }

                this.loadUrl(this.params);
            },
            'data.type'    : function (newValue, oldValue) {
                this.params.file_type = newValue;
                this.loadUrl(this.params);
            },
            'enabledTags'  : function (newValue, oldValue) {
                this.params.tags = newValue;
                this.loadUrl(this.params);
            },
            'data.perPage' : function (newValue) {
                this.params.perPage = newValue;
                // this.loadUrl(this.params);
            },
            viewMode       : function (newValue) {
                location.hash = 'viewMode=' + newValue;
            }
        },
        methods   : {
            loadUrl    : function (url, params) {
                let vm = this;

                if (typeof url === 'string') {
                    this.url = url;
                } else {
                    params = url;
                    url    = this.url.replace(/page=[\d]+&?/, '');
                }

                params         = params || {};
                params.perPage = this.data.perPage;

                if (/\?/.test(url)) {
                    window.location.hash = url.split('?')[1];
                } else {
                    window.location.hash = $.param(params);
                }

                axios.get(url, {params: params}).then(function (response) {
                    let data        = response.data || {};
                    vm.campaignData = data.campaign || false;
                    vm.categories   = data.categories || {};
                    vm.allPosts     = data.posts && data.posts.data || {};
                    vm.posts        = vm.allPosts;
                    vm.client       = data.client || {};
                    vm.tags         = data.tags || [];
                    vm.pagination   = data.posts;
                    vm.types        = data.types || [];
                    vm.loaded       = true;
                    vm.data.pageNum = vm.pagination.current_page;
                });
            },
            downloadUrl: function (post) {
                return this.requestUrl + (post.url ? post.url : '/download/' + post.file);
            },
            download   : function (post) {
                // gtmEvents.log(this.downloadCategory, this.downloadAction, post.url ? post.url : post.file);
            },

            closeModal           : function () {
                let vm = this;
                setTimeout(function () {
                    vm.modal = {};
                    MicroModal.close('posts-modal'); // [1]
                }, 500);
            },
            showModal            : function (post) {
                let vm = this;

                this.modal       = post;
                this.modal.image = this.modal.thumbnail_path || this.modal.file_path;
                MicroModal.show('posts-modal', {
                    onClose: function () {
                        vm.modal = {};
                    }
                }); // [1]
            },
            isTagSelected(name) {
                return this.inArray(this.enabledTags, name);
            },
            inArray(haystack, needle) {
                return _.indexOf(haystack, needle) > -1;
            },
            videoSrc(url) {
                return url.replace('&download=1', '');
            },
            addTag(name) {
                this.enabledTags.push(name);
            },
            removeTag(name) {
                this.enabledTags = this.enabledTags.filter(function (val) {
                    return val !== name;

                });
            },
            selectTag            : function (name) {
                if (this.isTagSelected(name)) {
                    this.removeTag(name);
                } else {
                    this.addTag(name);
                }
            },
            checked              : function (val) {
                if (val.checked) {
                    this.addSelectedPost(val.id);
                } else {
                    this.removeSelectedPost(val.id);
                }
            },
            removeSelectedPost(id) {
                if (this.isPostSelected(id)) {
                    this.selectedPosts.splice(this.selectedPosts.indexOf(id), 1);
                }

            },
            addSelectedPost(id) {
                if (!this.isPostSelected(id)) {
                    this.selectedPosts.push(id);
                }
            },
            isPostSelected       : function (id) {
                return this.inArray(this.selectedPosts, id);
            },
            deselectAllPosts     : function () {
                this.selectedPosts = [];
            },
            selectAllPosts       : function () {
                let vm = this;

                if (this.allPostsSelected) {
                    vm.selectedPosts = [];
                    return;
                }
                vm.selectedPosts = [];
                this.posts.forEach(function (n) {
                    vm.selectedPosts.push(n.id);
                });

            },
            filterByTag          : function (name) {
                return this.allPosts.filter(function (n) {
                    return n.tag_names.indexOf(name) > -1;
                });
            },
            downloadSelectedPosts: function () {
                window.location = this.requestUrl + '/download-batch?d=' + this.selectedPosts.join(',');
                this.deselectAllPosts();
            },
            firstPage            : function () {
                this.loadUrl(this.pagination.first_page_url + '&' + $.param(this.params));

            },
            lastPage             : function () {
                this.loadUrl(this.pagination.last_page_url + '&' + $.param(this.params));

            },
            loadPage             : function (url) {
                this.loadUrl(url + '&' + $.param(this.params));

            },
            nextPage             : function () {
                this.loadUrl(this.pagination.next_page_url + '&' + $.param(this.params));
            },
            prevPage             : function () {
                this.loadUrl(this.pagination.prev_page_url + '&' + $.param(this.params));
            },
            paginationAction     : function () {

            },
            changePage           : function (newValue) {
                let pageNum = parseInt(newValue, 10),
                    url;
                if (!newValue.length) {
                    return true;
                }
                if (pageNum >= 1 && pageNum <= this.pagination.last_page) {
                    if (pageNum < this.pagination.current_page) {
                        url = this.pagination.prev_page_url.replace(/page=([\d]+)/, function () {
                            return 'page=' + pageNum;
                        });
                        this.loadPage(url);
                    }
                    if (pageNum > this.pagination.current_page) {
                        url = this.pagination.next_page_url.replace(/page=([\d]+)/, function () {
                            return 'page=' + pageNum;
                        });
                        this.loadPage(url);
                    }
                    return true;
                }

                return false;
            }
        },
    };
</script>

<style lang="scss">
    @import '../assets/sass/app.scss';

    .post-content {
        margin-bottom: 1rem;
    }
</style>
