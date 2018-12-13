import IVueLoadingBar from '../../src/components/IVueLoadingBar';
import Vue from 'vue';

import { mount } from '@vue/test-utils';

describe('IVueMessage', function () {
      it('should render the register the global IVueMessage component', async () => {
            const wrapper = mount({
                  template: `
                        <div>
                              <Button @click="start">Start</Button>
                              <Button @click="finish">Finish</Button>
                              <Button @click="error">Error</Button>
                              <Button @click="update">update</Button>
                        </div>      
                  `,
                  mounted () {
                        // 注册全局 IVueMessage 组件
                        Vue.prototype.$IVueLoadingBar = IVueLoadingBar;
                  },
                  methods: {
                        start () {
                              this.$IVueLoadingBar.start();
                        },
                        finish () {
                              this.$IVueLoadingBar.finish();
                        },
                        error () {
                              this.$IVueLoadingBar.error();
                        },
                        update(){
                              this.$IVueLoadingBar.update(50);
                        }
                  }
            }, {
                         
                  });

            expect(Vue.prototype.$IVueLoadingBar).to.contain(Object);
      });
});