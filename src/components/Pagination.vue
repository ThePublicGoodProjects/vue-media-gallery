<template>
    <nav aria-label="Pagination" v-if="hasPages">
        <ul class="pagination">
            <li class="pagination-first" v-if="firstPage">
                <a @click.prevent="firstPage" :class="settings.prev_page_url ? '' : 'disabled'" aria-label="First page">1</a>
            </li>
            <li class="pagination-previous" v-if="settings.prev_page_url"><a @click.prevent="prevPage" aria-label="Prev page"><span
                    class="show-for-sr">page</span></a>
            </li>
            <li class="pagination-previous disabled" v-else><span v-if="!settings.prev_page_url"></span></li>
            <li><input type="text" v-model="data.currentPage"/> of {{settings.last_page}}</li>
            <li class="pagination-next" v-if="settings.next_page_url">
                <a @click.prevent="nextPage" aria-label="Next page"><span class="show-for-sr">page</span></a>
            </li>
            <li class="pagination-next disabled" v-else><span v-if="!settings.next_page_url"></span></li>
            <li class="pagination-last" v-if="settings.next_page_url && lastPage">
                <a @click.prevent="lastPage" :class="settings.next_page_url ? '' : 'disabled'" aria-label="Last page">{{settings.last_page}}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            settings       : {
                type   : Object,
                default: function () {
                    return {};
                }
            },
            nextPage: {
                type: Function,
                required: true
            },
            prevPage: {
                type: Function,
                required: true
            },
            lastPage: {
                type: Function,
            },
            firstPage: {
                type: Function,
            },
            changePage: {
                type: Function
            }
        },
        computed: {
            hasPages: function () {
                return this.settings.last_page && this.settings.last_page > 1;
            }
        },
        watch: {
            'settings.current_page': function (newValue) {
                this.data.currentPage = newValue;
            },
            'data.currentPage': function (newValue) {
                if (!this.changePage(newValue)) {
                    this.data.currentPage = this.settings.current_page;
                }
            }

        },
        data() {
            return {
                data: {
                    currentPage: this.settings.current_page || 1
                }

            };
        }
    };
</script>

<style scoped>

</style>
