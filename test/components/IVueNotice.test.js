import IvueNotice from '../../src/components/ivue-notice';
import Vue from 'vue';

import { mount } from '@vue/test-utils';

describe('IvueNotice', function () {
      it('should render the register the global IvueNotice component', async () => {
            const wrapper = mount({
                  template: `
                        <Button type="primary" @click="notice">Open notice</Button>
                  `,
                  mounted () {
                        // 注册全局 IvueNotice 组件
                        Vue.prototype.$IvueNotice = IvueNotice;
                  },
                  methods: {
                        notice () {
                              this.$IvueNotice.config({
                                    top: 50,
                                    duration: 3
                                });
                                this.$IvueNotice.open({
                                    title: 'Notification title',
                                    desc: 'This notification does not automatically close, and you need to click the close button to close.',
                                    duration: 0
                                });
                                this.$IvueNotice.open({
                                    title: 'name : one',
                                    duration: 0,
                                    name: 'one'
                                });
                                this.$IvueNotice.success({
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
                                this.$IvueNotice.success({
                                    title: 'Notification title',
                                    desc: 'This notification does not automatically close, and you need to click the close button to close.',
                                    duration: 0
                                });
                                this.$IvueNotice.success({
                                    title: 'Notification title',
                                    duration: 0
                                });
                                this.$IvueNotice.info({
                                    title: 'Notification title',
                                    desc: 'This notification does not automatically close, and you need to click the close button to close.',
                                    duration: 0
                                });
                                this.$IvueNotice.info({
                                    title: 'Notification title',
                                    duration: 0
                                });
                                this.$IvueNotice.warning({
                                    title: 'Notification title',
                                    desc: 'This notification does not automatically close, and you need to click the close button to close.',
                                    duration: 0
                                });
                                this.$IvueNotice.warning({
                                    title: 'Notification title',
                                    duration: 0
                                });
                                this.$IvueNotice.error({
                                    title: 'Notification title',
                                    desc: 'This notification does not automatically close, and you need to click the close button to close.',
                                    duration: 0
                                });
                                this.$IvueNotice.error({
                                    title: 'Notification title',
                                    duration: 0
                                });
                        }
                  }
            }, {
                         
                  });

            expect(Vue.prototype.$IvueNotice).to.contain(Object);
      });
});