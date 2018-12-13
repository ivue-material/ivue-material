import IVueNotice from '../../src/components/IVueNotice';
import Vue from 'vue';

import { mount } from '@vue/test-utils';

describe('IVueNotice', function () {
      it('should render the register the global IVueNotice component', async () => {
            const wrapper = mount({
                  template: `
                        <Button type="primary" @click="notice">Open notice</Button>
                  `,
                  mounted () {
                        // 注册全局 IVueNotice 组件
                        Vue.prototype.$IVueNotice = IVueNotice;
                  },
                  methods: {
                        notice () {
                              this.$IVueNotice.config({
                                    top: 50,
                                    duration: 3
                                });
                                this.$IVueNotice.open({
                                    title: 'Notification title',
                                    desc: 'This notification does not automatically close, and you need to click the close button to close.',
                                    duration: 0
                                });
                                this.$IVueNotice.open({
                                    title: 'name : one',
                                    duration: 0,
                                    name: 'one'
                                });
                                this.$IVueNotice.success({
                                    title: 'Notification title',
                                    desc: 'This notification does not automatically close, and you need to click the close button to close.',
                                    duration: 0,
                                    render: h => {
                                        return h('span', [
                                            'This is created by ',
                                            h('a', 'render'),
                                            ' function'
                                        ])
                                    }
                                });
                                this.$IVueNotice.success({
                                    title: 'Notification title',
                                    desc: 'This notification does not automatically close, and you need to click the close button to close.',
                                    duration: 0
                                });
                                this.$IVueNotice.success({
                                    title: 'Notification title',
                                    duration: 0
                                });
                                this.$IVueNotice.info({
                                    title: 'Notification title',
                                    desc: 'This notification does not automatically close, and you need to click the close button to close.',
                                    duration: 0
                                });
                                this.$IVueNotice.info({
                                    title: 'Notification title',
                                    duration: 0
                                });
                                this.$IVueNotice.warning({
                                    title: 'Notification title',
                                    desc: 'This notification does not automatically close, and you need to click the close button to close.',
                                    duration: 0
                                });
                                this.$IVueNotice.warning({
                                    title: 'Notification title',
                                    duration: 0
                                });
                                this.$IVueNotice.error({
                                    title: 'Notification title',
                                    desc: 'This notification does not automatically close, and you need to click the close button to close.',
                                    duration: 0
                                });
                                this.$IVueNotice.error({
                                    title: 'Notification title',
                                    duration: 0
                                });
                        }
                  }
            }, {
                         
                  });

            expect(Vue.prototype.$IVueNotice).to.contain(Object);
      });
});