<template>
    <div>
        <!-- <ivue-list>
            <ivue-list-item>Plain Text</ivue-list-item>
            <ivue-list-item rippleDisabled>Plain Text</ivue-list-item>
            <ivue-list-item @click="handleClick">click</ivue-list-item>
            <ivue-list-item :disabled="true" type="button"
                >button</ivue-list-item
            >

            <ivue-list-item href="'www.baidu.com'" rippleDisabled
                >link</ivue-list-item
            >
        </ivue-list> -->
        {{expandNews}}
        <p>expand</p>
        <ivue-list :ivueExpandSingle="expandSingle">
            <ivue-list-item
                ivueExpand
                @ivue-expanded="handleExpanded"
                @ivue-collapsed="handleCollapsed"
            >
                <span class="ivue-list-item-text">News</span>
                <template v-slot:ivueExpand>
                    <ivue-list>
                        <ivue-list-item class="ivue-inset"
                            >World</ivue-list-item
                        >
                        <ivue-list-item class="ivue-inset"
                            >World</ivue-list-item
                        >
                    </ivue-list>
                </template>
            </ivue-list-item>


              <ivue-list-item
                ivueExpand
                @ivue-expanded="handleExpanded"
                @ivue-collapsed="handleCollapsed"
            >
                <span class="ivue-list-item-text">News</span>
                <template v-slot:ivueExpand>
                    <ivue-list>
                        <ivue-list-item class="ivue-inset"
                            >World</ivue-list-item
                        >
                        <ivue-list-item class="ivue-inset"
                            >World</ivue-list-item
                        >
                    </ivue-list>
                </template>
            </ivue-list-item>

            <!-- <ivue-list-item
                ivue-expand
                v-model:ivueExpanded="expandNews"
                @ivue-expanded="handleExpanded"
                @ivue-collapsed="handleCollapsed"
                ivueExpandSingle
            >
                <span class="ivue-list-item-text">News</span>
                <template v-slot:ivueExpand>
                    <ivue-list>
                        <ivue-list-item class="ivue-inset"
                            >World</ivue-list-item
                        >
                        <ivue-list-item class="ivue-inset"
                            >World</ivue-list-item
                        >
                    </ivue-list>
                </template>
            </ivue-list-item> -->
        </ivue-list>
    </div>
</template>

<script>
export default {
    data () {
        return {
            expandNews: false,
            expandSingle: true
        }
    },
    methods: {
        handleClick () {
        },
        handleExpanded () {
        },
        handleCollapsed () {
        }
    }
}
</script>
