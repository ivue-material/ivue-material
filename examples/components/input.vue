<template>
    <div>
        <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
        />
        <p>
            基本用法，可以使用 v-model 实现数据的双向绑定。可以直接设置 style
            来改变输入框的宽度，默认 100%。
        </p>

        <ivue-input v-model="value1" placeholder="Enter something..." @on-enter="handleEnter">
        </ivue-input>
        <p>
            输入框有三种尺寸：大、默认（中）、小
            通过设置size为large和small设置为大和小尺寸，不设置为默认（中）尺寸。
        </p>
        <p>large</p>
        <ivue-input
            v-model="value1"
            size="large"
            placeholder="large size"
        ></ivue-input>
        <p>default</p>
        <ivue-input v-model="value1" placeholder="default size"></ivue-input>
        <p>small</p>
        <ivue-input
            v-model="value1"
            size="small"
            placeholder="small size"
        ></ivue-input>

        <ivue-input
            v-model="value1"
            size="large"
            placeholder="Enter something..."
            @on-change="handleChange"
        >
            <template #prepend>http://</template>
            <template #append>.com</template>
        </ivue-input>

        <ivue-input
            v-model="value1"
            size="small"
            placeholder="Enter something..."
            @on-change="handleChange"
        >
            <template #prepend>http://</template>
            <template #append>.com</template>
        </ivue-input>

        <p>开启属性 clearable 可显示清空按钮。</p>

        <ivue-input v-model="value1" size="large" clearable> </ivue-input>
        <ivue-input v-model="value1" size="small" clearable> </ivue-input>
        <ivue-input v-model="value1" clearable> </ivue-input>

        <p>
            开启属性 show-word-limit 可以显示字数统计，需配合 maxlength
            属性来限制输入长度
        </p>

        <ivue-input v-model="value1" show-word-limit :maxlength="10">
        </ivue-input>
        <p>在 type="password" 时，开启属性 password 可以切换显示隐藏密码</p>
        <ivue-input v-model="value1" type="password" password size="large">
        </ivue-input>
        <ivue-input v-model="value1" type="password" password size="small">
        </ivue-input>
        <ivue-input v-model="value1" type="password" password> </ivue-input>
        <p>通过设置 prefix 和 suffix 及同名 slot 设置前缀及后缀图标。</p>

        <ivue-input
            prefix="face"
            v-model="value1"
            type="password"
            suffix="search"
            size="large"
            clearable
        >
        </ivue-input>

        <ivue-input
            clearable
            prefix="face"
            v-model="value1"
            type="password"
            suffix="search"
            size="small"
        >
        </ivue-input>
        <ivue-input
            clearable
            prefix="face"
            v-model="value1"
            type="password"
            suffix="search"
        >
        </ivue-input>

        <ivue-input v-model="value1" type="password" @on-suffix="handleSuffix">
            <template #prefix>
                <ivue-icon>face</ivue-icon>
            </template>
            <template #suffix>
                <ivue-icon>search</ivue-icon>
            </template>
        </ivue-input>

        <p>开启 search 属性，可以设置为搜索型输入框。</p>

        <ivue-input
            v-model="value1"
            search
            @on-search="handleSearch"
            size="large"
        >
        </ivue-input>
        <p>1</p>
        <ivue-input v-model="value1" search enter-button size="small">
        </ivue-input>
        <p>1</p>

        <ivue-input v-model="value1" search enter-button="Search" size="large">
        </ivue-input>

        <p>
            通过设置属性 type 为 textarea 来使用文本域，用于多行输入。
            通过设置属性 rows 控制文本域默认显示的行数。
        </p>

        <ivue-input v-model="value1" type="textarea"> </ivue-input>
        <p>rows</p>
        <ivue-input v-model="value1" type="textarea" :rows="4"> </ivue-input>

        <p>
            设置属性 autosize，文本域会自动适应高度的变化。
            autosize也可以设定为一个对象，指定最小行数和最大行数。
        </p>
        <ivue-input
            v-model="value1"
            type="textarea"
            :autoHeight="true"
            disabled
        >
        </ivue-input>
        <p>rows</p>
        <ivue-input
            disabled
            v-model="value1"
            type="textarea"
            :autoHeight="{ minRows: 2, maxRows: 5 }"
        >
        </ivue-input>

        <p>通过设置属性border可以不显示边框</p>
        <ivue-input v-model="value1" :border="false"></ivue-input>
        <ivue-input
            v-model="value1"
            type="textarea"
            :border="false"
        ></ivue-input>
        <p>聚焦额外配置属性。</p>

        <button @click="handleFocus('start')">Focus at first</button>
        <button @click="handleFocus('end')">Focus at last</button>
        <button @click="handleFocus('all')">Focus to select all</button>
        <button @click="handleFocus('preventScroll')"
            >Focus prevent scroll</button
        >

        <ivue-input
            ref="input"
            v-model="value1"
        ></ivue-input>
    </div>
</template>

<script>

export default {
    data () {
        return {
            value1: 'View UI’s birthday is July 28',
        }
    },
    methods: {
        handleChange () {

        },
        handleSuffix (e) {
            console.log('??')
        },
        handleSearch (e) {
            console.log(e)
        },
        handleFocus (type) {
            if (type === 'preventScroll') {
                this.$refs.input.focus({
                    preventScroll: true
                });
            } else {
                this.$refs.input.focus({
                    cursor: type
                });
            }
        },
        handleEnter(){
            console.log('handleEnter')
        }
    }
}
</script>

<style>
</style>
