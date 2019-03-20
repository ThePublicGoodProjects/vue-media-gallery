<template>
    <div class="copy-to-clipboard">
        <p class="clipboard-content">{{ content }}</p>
        <button class="button button-tooltip button-icon" type="button" :data-clipboard="content" @click.prevent="copy">
            <span class="tooltip-text">Copy to clipboard</span>
            <i class="far fa-copy"></i>
        </button>
    </div>
</template>

<script>
    // const copyToClipboard = require('../copy-to-clipboard');
    const $ = require('jquery');

    export default {
        name: "CopyToClipboard",
        components: {
        },
        props     : {
            content: {
                type: String
            }
        },
        data() {
            return {};
        },
        created() {
        },
        mounted() {
            // debugger;
            // copyToClipboard();
        },
        methods: {
            copy: function () {
                /* Get the text field */
                var $input   = $('<textarea>'),
                    $tooltip = $(this.$el).find('.tooltip-text');

                $('body').append($input);
                $input.val(this.content);
                /* Select the text field */
                $input[0].select();

                /* Copy the text inside the text field */
                document.execCommand("copy");
                $input.remove();

                if ($tooltip.length) {
                    $tooltip.text('Copied!');
                }

            }

        }
    };
</script>

<style scoped>

</style>
