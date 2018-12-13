import IVueCarousel from '../../src/components/IVueCarousel';
import IVueCarouselItem from '../../src/components/IVueCarouselItem';
import { mount } from '@vue/test-utils';

describe('IVueCarousel', function () {
      it('should render the list', async () => {
            const wrapper = mount({
                  template: `
                        <IVueCarousel v-model="value1" :arrow="'always'" loop>
                              <IVueCarouselItem>
                                    <div style=" height: 200px;
                                    line-height: 200px;
                                    text-align: center;
                                    color: #fff;
                                    font-size: 20px;
                                    background: #506b9e;"
                              >1</div>
                              </IVueCarouselItem>
                              <IVueCarouselItem>
                                    <div style=" height: 200px;
                                    line-height: 200px;
                                    text-align: center;
                                    color: #fff;
                                    font-size: 20px;
                                    background: #506b9e;">2</div>
                              </IVueCarouselItem>
                              <IVueCarouselItem>
                                    <div style=" height: 200px;
                                    line-height: 200px;
                                    text-align: center;
                                    color: #fff;
                                    font-size: 20px;
                                    background: #506b9e;">3</div>
                              </IVueCarouselItem>
                        </IVueCarousel>
                  `,
                  data () {
                        return {
                              value1: 0
                        }
                  },
                  components: {
                        IVueCarousel,
                        IVueCarouselItem
                  }
            }, {
                         
                  });

            expect(wrapper.classes()).to.contain('ivue-carousel');
            expect(wrapper.element.childNodes[2].className).to.contain('ivue-carousel-list');
            expect(wrapper.element.childNodes[0].className).to.contain('ivue-carousel-arrow-always');
      });
})