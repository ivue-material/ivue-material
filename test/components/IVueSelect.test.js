import { IvueSelect, IvueOption, IvueOptionGroup } from '../../src/components/ivue-select';
import { mount } from '@vue/test-utils';

describe('IvueSelect', function () {
      it('should render the base IvueSelect', async () => {
            const wrapper = mount({
                  template: `
                        <ivue-select>
                              <ivue-option v-for="(item,index) in cityList1" :value="item.value" :key="index">
                                    <span>{{ item.label }}</span>
                              </ivue-option>
                        </ivue-select>
                  `,
                  data () {
                        return {
                              cityList1: [
                                    {
                                          value: 'New York',
                                          label: 'New'
                                    },
                                    {
                                          value: 'London',
                                          label: 'London'
                                    },
                                    {
                                          value: 'London',
                                          label: 'London'
                                    },
                                    {
                                          value: 'Sydney',
                                          label: 'Sydney'
                                    },
                                    {
                                          value: 'Ottawa',
                                          label: 'Ottawa'
                                    },
                                    {
                                          value: 'Paris',
                                          label: 'Paris'
                                    },
                                    {
                                          value: 'Canberra',
                                          label: 'Canberra'
                                    }
                              ]
                        }
                  },
                  components: {
                        IvueSelect,
                        IvueOption
                  }
            }, {

                  });




            expect(wrapper.classes()).to.contain('ivue-select');
            expect(wrapper.contains(IvueOption)).to.be.equal(true);
            wrapper.find('.ivue-select-selection').trigger('click');
            expect(wrapper.find('.ivue-select-selection').vnode.context.visibleMenu).to.be.equal(true);
            wrapper.find('.ivue-select-item').trigger('click');
            expect(wrapper.find('.ivue-select-selection-value').text()).to.be.equal('New');
      });


      it('should render the multiple IvueSelect', async () => {
            const wrapper = mount({
                  template: `
                        <ivue-select multiple>
                              <ivue-option v-for="(item,index) in cityList1" :value="item.value" :key="index">
                                    <span>{{ item.label }}</span>
                              </ivue-option>
                        </ivue-select>
                  `,
                  data () {
                        return {
                              cityList1: [
                                    {
                                          value: 'New York',
                                          label: 'New'
                                    },
                                    {
                                          value: 'London',
                                          label: 'London'
                                    },
                                    {
                                          value: 'London',
                                          label: 'London'
                                    },
                                    {
                                          value: 'Sydney',
                                          label: 'Sydney'
                                    },
                                    {
                                          value: 'Ottawa',
                                          label: 'Ottawa'
                                    },
                                    {
                                          value: 'Paris',
                                          label: 'Paris'
                                    },
                                    {
                                          value: 'Canberra',
                                          label: 'Canberra'
                                    }
                              ]
                        }
                  },
                  components: {
                        IvueSelect,
                        IvueOption
                  }
            }, {

                  });




            expect(wrapper.classes()).to.contain('ivue-select');
            expect(wrapper.contains(IvueOption)).to.be.equal(true);
            wrapper.find('.ivue-select-selection').trigger('click');
            expect(wrapper.find('.ivue-select-selection').vnode.context.visibleMenu).to.be.equal(true);
            wrapper.find('.ivue-select-item').trigger('click');
            expect(wrapper.find('.ivue-select-selection-multiple').text()).to.be.equal('New close');
      });


      it('should render the disabled IvueSelect', async () => {
            const wrapper = mount({
                  template: `
                        <ivue-select disabled>
                              <ivue-option v-for="(item,index) in cityList1" :value="item.value" :key="index">
                                    <span>{{ item.label }}</span>
                              </ivue-option>
                        </ivue-select>
                  `,
                  data () {
                        return {
                              cityList1: [
                                    {
                                          value: 'New York',
                                          label: 'New'
                                    },
                                    {
                                          value: 'London',
                                          label: 'London'
                                    },
                                    {
                                          value: 'London',
                                          label: 'London'
                                    },
                                    {
                                          value: 'Sydney',
                                          label: 'Sydney'
                                    },
                                    {
                                          value: 'Ottawa',
                                          label: 'Ottawa'
                                    },
                                    {
                                          value: 'Paris',
                                          label: 'Paris'
                                    },
                                    {
                                          value: 'Canberra',
                                          label: 'Canberra'
                                    }
                              ]
                        }
                  },
                  components: {
                        IvueSelect,
                        IvueOption
                  }
            }, {

                  });


            expect(wrapper.classes()).to.contain('ivue-select-disabled');
      });
})
