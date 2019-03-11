
import IvueCascader from '../../src/components/ivue-cascader';
import { mount, createLocalVue } from '@vue/test-utils';

describe('IvueCascader', function () {
    it('should render default cascader', function () {
        const wrapper = mount({
            template: `
                    <IvueCascader :options="options" :value="optionsvalue"></IvueCascader>
                  `,
            data () {
                return {
                    options: [{
                        value: 'zhinan',
                        label: '指南',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }]
                    }, {
                        value: 'shejiyuanze',
                        label: '设计原则',
                    }],
                    optionsvalue: ['shejiyuanze']
                }
            },
            components: {
                IvueCascader
            }
        });

        expect(wrapper.find('.ivue-cascader-label').text()).to.be.equal('设计原则');
        wrapper.find('.ivue-cascader-menu--item').trigger('click')
        expect(wrapper.find('.ivue-cascader-label').text()).to.be.equal('设计原则');
    });
});
