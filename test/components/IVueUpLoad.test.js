import IVueUpLoad from '../../src/components/IVueUpLoad';
import { mount } from '@vue/test-utils';

describe('IVueUpLoad', function () {
      it('should render the base IVueUpLoad', async () => {
            const wrapper = mount({
                  template: `
                        <IVueUpLoad :uploadUrl="'//jsonplaceholder.typicode.com/posts/'"  :accept="'image/jpeg'" :defaultFileList="defaultList">
                              上传
                        </IVueUpLoad>
                  `,
                  data () {
                        return {
                              defaultList: [
                                    {
                                          'name': '1',
                                          'url': 'https://cn.vuejs.org/images/logo.png'
                                    },
                                    {
                                          'name': '2',
                                          'url': 'https://cn.vuejs.org/images/logo.png'
                                    }
                              ]
                        }
                  },
                  components: {
                        IVueUpLoad
                  }
            });

            expect(wrapper.find('input').attributes('type')).to.be.equal('file');
            expect(wrapper.find('.ivue-upload-list').vnode.children.length).to.be.equal(2);
      });
});
