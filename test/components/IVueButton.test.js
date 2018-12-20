
import VueRouter from 'vue-router';
import IvueButton from '../../src/components/IvueButton';
import { mount, createLocalVue } from '@vue/test-utils';

describe('IvueButton', function () {
      it('should render the theme class', function () {
            const wrapper = mount({
                  template: `
                        <IvueButton class="red-accent-4">button</IvueButton>
                  `,
                  components: {
                        IvueButton
                  }
            }, {
                  });

            expect(wrapper.classes()).to.contain('red-accent-4');
            expect(wrapper.classes()).to.contain('ivue-button');
            expect(wrapper.contains('button')).to.be.equal(true);
            expect(wrapper.attributes().type).to.be.equal('button');
      });


      it('should render tag <button> with type "button', function () {

            const wrapper = mount({
                  template: `
                        <IvueButton @click="onClick">button</IvueButton>
                  `,
                  methods: {
                        onClick () {
                              console.log('click-should render tag <button> with type "button');
                        }
                  },
                  components: {
                        IvueButton
                  }
            }, {
                  });


            wrapper.trigger('click')

            expect(wrapper.classes()).to.contain('ivue-button');
            expect(wrapper.attributes().type).to.be.equal('button');
            expect(wrapper.contains('button')).to.be.equal(true);
      });


      it('should render tag <button> with type "submit', function () {

            const wrapper = mount({
                  template: `
                        <IvueButton type="submit">button</IvueButton>
                  `,
                  components: {
                        IvueButton
                  }
            }, {
                  });

            expect(wrapper.classes()).to.contain('ivue-button');
            expect(wrapper.contains('button')).to.be.equal(true);
            expect(wrapper.attributes().type).to.be.equal('submit');
      });

      it('should render tag <a> when a href is given', function () {

            const wrapper = mount({
                  template: `
                        <IvueButton href="#test">button</IvueButton>
                  `,
                  components: {
                        IvueButton
                  }
            }, {
                  });



            expect(wrapper.contains('a')).to.be.equal(true);
            expect(wrapper.classes()).to.contain('ivue-button');
            expect(wrapper.attributes().type).to.be.equal(undefined);
            expect(wrapper.attributes().href).to.be.equal('#test');
      });

      it('should render tag <a> when using "to" prop from vue-router', function () {

            const localVue = createLocalVue();
            localVue.use(VueRouter);

            const router = new VueRouter({
                  mode: 'history',
                  routes: []
            })

            const rootWrapper = mount({
                  template: `
                        <IvueButton to="/">button</IvueButton>
                  `,
                  components: {
                        IvueButton
                  }
            }, {
                        localVue,
                        router
                  });


            const testWrapper = mount({
                  template: `
                              <IvueButton to="/test">button</IvueButton>
                        `,
                  components: {
                        IvueButton
                  }
            }, {
                        localVue,
                        router
                  });

            expect(rootWrapper.classes()).to.contain('router-link-active');
            expect(rootWrapper.classes()).to.contain('ivue-button');
            expect(rootWrapper.contains('a')).to.be.equal(true);
            expect(rootWrapper.attributes().href).to.be.equal(undefined);
            expect(rootWrapper.attributes().type).to.be.equal('button');

            expect(testWrapper.classes()).to.contain('ivue-button');
            expect(testWrapper.contains('a')).to.be.equal(true);
            expect(testWrapper.attributes().href).to.be.equal(undefined);
            expect(testWrapper.attributes().type).to.be.equal("button");
      });

      // it('should render tag <button> when using "to" prop and vue-router is not configured', function () {
      //       const wrapper = mount({
      //             template: `
      //                         <IvueButton to="/test">button</IvueButton>
      //                   `,
      //             components: {
      //                   IvueButton
      //             }
      //       }, {
      //             });


      //       expect(wrapper.classes()).to.contain('ivue-button');
      //       expect(wrapper.contains('button')).to.be.equal(true);
      //       expect(wrapper.attributes().type).to.be.equal('button');
      //       expect(wrapper.attributes().href).to.be.equal(undefined);

      // });

      it('should not render a ripple element if the button is disabled', function () {
            const wrapper = mount({
                  template: `
                              <IvueButton class="ivue-raised" disabled>button</IvueButton>
                        `,
                  components: {
                        IvueButton
                  }
            }, {
                  });

            expect(wrapper.classes()).to.contain('ivue-button');
            expect(wrapper.contains('button')).to.be.equal(true);
            expect(wrapper.attributes().type).to.be.equal('button');
            expect(wrapper.attributes().disabled).to.be.equal('disabled');
            expect(wrapper.element.childNodes[0].className.indexOf('ivue-disabled') >= 0).to.be.equal(true);
      });

      it('should not render a ripple element when ivue-ripple is false', function () {
            const wrapper = mount({
                  template: `
                              <IvueButton  class="ivue-raised" :ivueRipple="false">button</IvueButton>
                        `,
                  components: {
                        IvueButton
                  }
            }, {
                  });

            expect(wrapper.classes()).to.contain('ivue-button');
            expect(wrapper.attributes().disabled).to.be.equal(undefined);
            expect(wrapper.element.childNodes[0].className.indexOf('ivue-disabled') >= 0).to.be.equal(true);
            expect(wrapper.contains('button')).to.be.equal(true);
            expect(wrapper.attributes().type).to.be.equal('button');
      });
});
