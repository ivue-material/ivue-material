import IvueUpLoad from '../../src/components/IvueUpLoad';
import { mount } from '@vue/test-utils';

describe('IvueUpLoad', function () {
      it('should render the base IvueUpLoad', async () => {
            const wrapper = mount({
                  template: `
                        <IvueUpLoad :uploadUrl="'//jsonplaceholder.typicode.com/posts/'"  :accept="'image/jpeg'" :defaultFileList="defaultList">
                              上传
                        </IvueUpLoad>
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
                        IvueUpLoad
                  }
            });

            expect(wrapper.find('input').attributes('type')).to.be.equal('file');
            expect(wrapper.find('.ivue-upload-list').vnode.children.length).to.be.equal(2);
      });
});
