import IvueCarousel from '../../src/components/ivue-carousel';
import IvueCarouselItem from '../../src/components/ivue-carousel-item';
import { mount } from '@vue/test-utils';

describe('IvueCarousel', function () {
      it('should render the list', async () => {
            const wrapper = mount({
                  template: `
                        <IvueCarousel v-model="value1" :arrow="'always'" loop>
                              <IvueCarouselItem>
                                    <div style=" height: 200px;
                                    line-height: 200px;
                                    text-align: center;
                                    color: #fff;
                                    font-size: 20px;
                                    background: #506b9e;"
                              >1</div>
                              </IvueCarouselItem>
                              <IvueCarouselItem>
                                    <div style=" height: 200px;
                                    line-height: 200px;
                                    text-align: center;
                                    color: #fff;
                                    font-size: 20px;
                                    background: #506b9e;">2</div>
                              </IvueCarouselItem>
                              <IvueCarouselItem>
                                    <div style=" height: 200px;
                                    line-height: 200px;
                                    text-align: center;
                                    color: #fff;
                                    font-size: 20px;
                                    background: #506b9e;">3</div>
                              </IvueCarouselItem>
                        </IvueCarousel>
                  `,
                  data () {
                        return {
                              value1: 0
                        }
                  },
                  components: {
                        IvueCarousel,
                        IvueCarouselItem
                  }
            }, {
                         
                  });

            expect(wrapper.classes()).to.contain('ivue-carousel');
            expect(wrapper.element.childNodes[2].className).to.contain('ivue-carousel-list');
            expect(wrapper.element.childNodes[0].className).to.contain('ivue-carousel-arrow-always');
      });
})