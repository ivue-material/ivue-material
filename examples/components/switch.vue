<template>
    <div>
        <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
        />
        <p>基础</p>

        <ivue-switch
            color="#13ce66"
            false-color="#ff4949"
            v-model="switch1"
            @on-change="handleChange"
            :before-change="handleBeforeChange"
        ></ivue-switch>

        <p>flat</p>
        <ivue-switch
            color="#000"
            v-model="switch1"
            @on-change="handleChange"
            emboss
        >
            <template #open>
                <span>开启</span>
            </template>

            <template #close>
                <span>关闭</span>
            </template>
        </ivue-switch>
        <ivue-switch
            color="red-accent-4"
            v-model="switch1"
            @on-change="handleChange"
            emboss
        ></ivue-switch>
        {{ switch1 }}

        <p>大小</p>
        <ivue-switch size="large"></ivue-switch>
        <ivue-switch></ivue-switch>
        <ivue-switch size="small"></ivue-switch>
        <ivue-switch size="small" emboss></ivue-switch>
        <ivue-switch emboss></ivue-switch>
        <ivue-switch size="large" emboss></ivue-switch>
        <p>文字图标</p>
        <ivue-switch size="large">
            <template #open>
                <span>开启</span>
            </template>

            <template #close>
                <span>关闭</span>
            </template>
        </ivue-switch>
        <ivue-switch>
            <template #open>
                <span>开启</span>
            </template>

            <template #close>
                <span>关闭</span>
            </template>
        </ivue-switch>
        <p>不可用</p>
        <ivue-switch :disabled="true" :value="true" size="large"></ivue-switch>
        <ivue-switch :disabled="true" :value="true" emboss></ivue-switch>
        <ivue-switch :disabled="true" :value="false" emboss></ivue-switch>
        <p>loading</p>
        <ivue-switch
            loadingColor="#000"
            v-model="switch1"
            emboss
            color="#F41D74"
        ></ivue-switch>
        <ivue-switch
            loading
            loadingColor="#000"
            v-model="switch1"
            emboss
            color="#F41D74"
            size="large"
        ></ivue-switch>
        <ivue-switch
            loading
            loadingColor="#000"
            v-model="switch1"
            emboss
            color="#F41D74"
            size="small"
        ></ivue-switch>
        <ivue-switch loading :value="true"></ivue-switch>
        <ivue-switch loading :value="true" size="large"></ivue-switch>
        <ivue-switch loading :value="true" size="small"></ivue-switch>
    </div>
</template>

<script>
export default {
    data () {
        return {
            switch1: true
        }
    },
    methods: {
        handleChange () {
            console.log('>')
        },
        handleBeforeChange () {
            return new Promise((resolve) => {
                console.log('?')
            });
        }
    }
}
</script>

<style lang="scss">
.ivue-icon {
    font-size: 12px;
    min-width: 12px;
    font-weight: bold;
}
</style>
