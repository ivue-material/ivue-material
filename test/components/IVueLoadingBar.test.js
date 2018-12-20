import IvueLoadingBar from '../../src/components/IvueLoadingBar';
import Vue from 'vue';

import { mount } from '@vue/test-utils';

describe('IvueMessage', function () {
      it('should render the register the global IvueMessage component', async () => {
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
                        // 注册全局 IvueMessage 组件
                        Vue.prototype.$IvueLoadingBar = IvueLoadingBar;
                  },
                  methods: {
                        start () {
                              this.$IvueLoadingBar.start();
                        },
                        finish () {
                              this.$IvueLoadingBar.finish();
                        },
                        error () {
                              this.$IvueLoadingBar.error();
                        },
                        update(){
                              this.$IvueLoadingBar.update(50);
                        }
                  }
            }, {
                         
                  });

            expect(Vue.prototype.$IvueLoadingBar).to.contain(Object);
      });
});