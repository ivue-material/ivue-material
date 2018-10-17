import IVueAutoComplete from '../../src/components/IVueAutoComplete';

import { mount } from '@vue/test-utils';

describe('IVueAutoComplete', function () {
      it('should render the base auto complete data source via data setting', async () => {
            const wrapper = mount({
                  template: `
                        <IVueAutoComplete v-model="value"
                                          :data="data"
                                          @on-search="handleSearch"
                              >
                        </IVueAutoComplete>
                  `,
                  data () {
                        return {
                              value: '',
                              data: ['q'],
                        }
                  },
                  methods: {
                        handleSearch (value) {
                              this.data = !value ? [] : [
                                    value,
                                    value + value,
                                    value + value + value
                              ];
                        }
                  },
                  components: {
                        IVueAutoComplete
                  }
            }, {
                        attachToDocument: true
                  });


            expect(wrapper.classes()).to.contain('ivue-auto-complete');
            wrapper.find('.ivue-select-selection-default').trigger('click');
            wrapper.find('.ivue-select-selection-default').trigger('click');
            wrapper.find('.ivue-select-selection-default').trigger('click');
            expect(wrapper.find('.ivue-select-item').text()).to.be.equal('q');
      });
});
