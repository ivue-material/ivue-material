import { IVueTabs, IVueTab, IVueTabItem, IVueTabsItems, IVueTabsSlider } from '../../src/components/IVueTabs';
import { mount } from '@vue/test-utils';

const Component = (items = ['foo', 'bar']) => {
      return {
            inheritAttrs: false,

            render (h) {
                  return h(IVueTabs, {
                        attrs: this.$attrs,
                        attachToDocument: true
                  }, [
                              items.map(item => h(IVueTab, {
                                    props: { href: `#${item}` }
                              })),
                              h(IVueTabsItems, items.map(item => h(IVueTabItem, {
                                    props: { id: item }
                              })))
                        ])
            }
      }
}



describe('IVueTabs', function () {
      it('should provide', async () => {
            const wrapper = mount({
                  template: `
                  <IVueTabs color="#424242">
                        <IVueTab>foo</IVueTab>
                        <IVueTab>bar</IVueTab>
                        <IVueTabItem>foo</IVueTabItem>
                        <IVueTabItem>bar</IVueTabItem>
                  </IVueTabs>

                  `,
                  components: {
                        IVueTabs,
                        IVueTab,
                        IVueTabItem
                  }
            }, {
                        attachToDocument: true
                  });

            const tab = wrapper.find(IVueTab)

            expect(typeof tab.vm.tabNavClick).to.be.equal('function');
            expect(typeof tab.vm.tabNavList.register).to.be.equal('function');
            expect(typeof tab.vm.tabNavList.unregister).to.be.equal('function');

            const items = wrapper.find(IVueTabItem);

            expect(typeof items.vm.$parent.tabProxy).to.be.equal('function');
            expect(typeof items.vm.$parent.registerItems).to.be.equal('function');
            expect(typeof items.vm.$parent.unregisterItems).to.be.equal('function');
      });


      it('should register tabs and items', async () => {
            const wrapper = mount(IVueTabs, {
                  slots: {
                        default: [IVueTab, IVueTabsItems]
                  }
            });

            const tab = wrapper.find(IVueTab);
            expect(wrapper.vm.tabNavList.length).to.be.equal(1);
            tab.destroy();
            expect(wrapper.vm.tabNavList.length).to.be.equal(0);

            const items = wrapper.find(IVueTabsItems);
            expect(typeof items.vm.changeModel).to.be.equal('function');
            items.destroy();
            expect(wrapper.vm.tabItems).to.be.equal(null);
      });



      it('should change tab and content when model changes', async () => {
            const wrapper = mount(Component(), {
                  attachToDocument: true
            });

            const tabs = wrapper.find(IVueTabs);
            const tab = wrapper.find(IVueTab);
            const item = wrapper.find(IVueTabItem);

            expect(tabs.vm.activeIndex).to.be.equal(0);
            expect(tab.vm.isActive).to.be.equal(false);
            expect(item.vm.isActive).to.be.equal(false);
      });


      it('should reset offset on resize', async () => {
            const wrapper = mount(Component(), {
                  attachToDocument: true
            });
            const tabs = wrapper.find(IVueTabs);

            tabs.setData({ scrollOffset: 1 });
            tabs.vm.onResize();

            await new Promise(resolve => setTimeout(resolve, 300));

            expect(tabs.vm.scrollOffset).to.be.equal(0);

            tabs.setData({ scrollOffset: 2 });

            await tabs.vm.$nextTick();
            tabs.destroy();
            tabs.vm.onResize();
            expect(tabs.vm.scrollOffset).to.be.equal(2)
      });


      it('should validate height prop', async () => {
            const wrapper = mount(IVueTabs, {
                  propsData: { height: '0' }
            })

            wrapper.setProps({ height: null })
            expect(wrapper.vm.containerStyles).to.be.equal(null)
            wrapper.setProps({ height: 112 })
            expect(wrapper.vm.containerStyles.height).to.be.equal('112px')
      })
});
