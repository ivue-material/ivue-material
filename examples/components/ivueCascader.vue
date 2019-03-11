<template>
    <div>
        <p>click</p>
        <IvueCascader :options="options" :value="optionValue" changeOnSelect clearable></IvueCascader>
        <p>hover</p>
        <IvueCascader trigger="hover" :options="options"></IvueCascader>
        <p>changeOnSelect</p>
        <IvueCascader :options="options" changeOnSelect></IvueCascader>
        <p>filterable</p>
        <IvueCascader :options="options" filterable></IvueCascader>
        <p>filterable changeOnSelect</p>
        <IvueCascader :options="options" filterable changeOnSelect></IvueCascader>
        <p>动态加载</p>
        <IvueCascader
            :options="options2"
            :props="props"
            :loading="loading"
            @active-item-change="handleActiveItemChange"
        >
            <div class="loading" slot="loading">
                <svg
                    class="lds-spinner"
                    width="144px"
                    height="200px"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                    style="background: none;"
                >
                    <g transform="rotate(0 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#4177f6">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.9166666666666666s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(30 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#4177f6">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.8333333333333334s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(60 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#4177f6">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.75s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(90 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#4177f6">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.6666666666666666s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(120 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#4177f6">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.5833333333333334s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(150 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#4177f6">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.5s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(180 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#4177f6">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.4166666666666667s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(210 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#4177f6">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.3333333333333333s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(240 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#4177f6">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.25s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(270 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#4177f6">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.16666666666666666s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(300 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#4177f6">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.08333333333333333s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                    <g transform="rotate(330 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#4177f6">
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="0s"
                                repeatCount="indefinite"
                            ></animate>
                        </rect>
                    </g>
                </svg>
            </div>
        </IvueCascader>
    </div>
</template>

<script>
export default {
    data () {
        return {
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }]
                }]
            }],
            optionValue: ['zhinan', 'shejiyuanze', 'yizhi'],
            options2: [{
                label: '江苏',
                cities: []
            }, {
                label: '浙江',
                cities: []
            }],
            props: {
                value: 'label',
                children: 'cities'
            },
            loading: false
        }
    },
    methods: {
        handleActiveItemChange (val) {
            console.log('active item:', val);
            if (!(this.options2[0].cities.length > 0 && this.options2[1].cities.length > 0)) {
                this.loading = true;
            }

            setTimeout(_ => {
                if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
                    this.options2[0].cities = [{
                        label: '南京'
                    }];
                } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
                    this.options2[1].cities = [{
                        label: '杭州'
                    }];
                }

                this.loading = false
            }, 300);
        }
    }

}
</script>

<style scoped>
.loading {
  position: absolute;
  top: 0;
}
</style>
