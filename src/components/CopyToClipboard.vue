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

<style scoped lang="scss">
    .copy-to-clipboard {
        > * {
            display: inline-block;
            margin: 0;
        }

        p {

        }

        .clipboard-content {
            padding: .5rem;
            /*margin-bottom: 1rem;*/
            background: #eee;
            vertical-align: middle;
        }
    }


    .button-tooltip {
        outline: none;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        background-color: #eee;
        color: #6b6b6b;
        border: 1px solid #ccc;

        .tooltip-text {
            visibility: hidden;
            font-size: 14px;
            width: 140px;
            background-color: #555;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 5px;
            position: absolute;
            z-index: 1;
            line-height: 1.2;
            bottom: 120%;
            left: 50%;
            margin-left: -75px;
            opacity: 0;
            transition: opacity 0.3s;
        }

        .tooltip-text::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: #555 transparent transparent transparent;
        }

        &:hover .tooltip-text {
            visibility: visible;
            opacity: 1;
        }
    }

</style>
