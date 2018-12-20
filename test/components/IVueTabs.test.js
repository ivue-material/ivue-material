import { IvueTabs, IvueTab, IvueTabItem, IvueTabsItems, IvueTabsSlider } from '../../src/components/IvueTabs';
import { mount } from '@vue/test-utils';

const Component = (items = ['foo', 'bar']) => {
      return {
            inheritAttrs: false,

            render (h) {
                  return h(IvueTabs, {
                  }, [
                              items.map(item => h(IvueTab, {
                                    props: { href: `#${item}` }
                              })),
                              h(IvueTabsItems, items.map(item => h(IvueTabItem, {
                                    props: { id: item }
                              })))
                        ])
            }
      }
}



describe('IvueTabs', function () {
      it('should provide', async () => {
            const wrapper = mount({
                  template: `
                  <IvueTabs color="#424242">
                        <IvueTab>foo</IvueTab>
                        <IvueTab>bar</IvueTab>
                        <IvueTabItem>foo</IvueTabItem>
                        <IvueTabItem>bar</IvueTabItem>
                  </IvueTabs>

                  `,
                  components: {
                        IvueTabs,
                        IvueTab,
                        IvueTabItem
                  }
            }, {
                  });

            const tab = wrapper.find(IvueTab)

            expect(typeof tab.vm.tabNavClick).to.be.equal('function');
            expect(typeof tab.vm.tabNavList.register).to.be.equal('function');
            expect(typeof tab.vm.tabNavList.unregister).to.be.equal('function');

            const items = wrapper.find(IvueTabItem);

            expect(typeof items.vm.$parent.tabProxy).to.be.equal('function');
            expect(typeof items.vm.$parent.registerItems).to.be.equal('function');
            expect(typeof items.vm.$parent.unregisterItems).to.be.equal('function');
      });


      it('should register tabs and items', async () => {
            const wrapper = mount(IvueTabs, {
                  slots: {
                        default: [IvueTab, IvueTabsItems]
                  }
            });

            const tab = wrapper.find(IvueTab);
            expect(wrapper.vm.tabNavList.length).to.be.equal(1);
            tab.destroy();
            expect(wrapper.vm.tabNavList.length).to.be.equal(0);

            const items = wrapper.find(IvueTabsItems);
            expect(typeof items.vm.changeModel).to.be.equal('function');
            items.destroy();
            expect(wrapper.vm.tabItems).to.be.equal(null);
      });



      it('should change tab and content when model changes', async () => {
            const wrapper = mount(Component(), {
            });

            const tabs = wrapper.find(IvueTabs);
            const tab = wrapper.find(IvueTab);
            const item = wrapper.find(IvueTabItem);

            expect(tabs.vm.activeIndex).to.be.equal(0);
            expect(tab.vm.isActive).to.be.equal(false);
            expect(item.vm.isActive).to.be.equal(false);
      });


      it('should reset offset on resize', async () => {
            const wrapper = mount(Component(), {
                   
            });
            const tabs = wrapper.find(IvueTabs);

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
            const wrapper = mount(IvueTabs, {
                  propsData: { height: '0' }
            })

            wrapper.setProps({ height: null })
            expect(wrapper.vm.containerStyles).to.be.equal(null)
            wrapper.setProps({ height: 112 })
            expect(wrapper.vm.containerStyles.height).to.be.equal('112px')
      })
});
