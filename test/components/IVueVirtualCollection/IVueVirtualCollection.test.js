import IvueVirtualCollection from '../../../src/components/ivue-virtual-collection/ivue-virtual-collection';
import { mount, shallowMount } from '@vue/test-utils';

function cellSizeAndPositionGetter (item, index) {
      // compute size and position
      return {
            width: 100,
            height: 150,
            x: (index % 2) * 110,
            y: parseInt(index / 2) * 160
      }
}

function groupedCellSizeAndPositionGetter (item, itemIndex, groupIndex) {
      // compute size and position
      return {
            width: 100,
            height: 150,
            x: (groupIndex * 2 + itemIndex % 2) * 110,
            y: parseInt(itemIndex / 2) * 160
      }
}


const items = new Array(1000).fill(0).map((_, index) => ({ data: '#' + index }))

const groups = [
      { group: new Array(10).fill(0).map((_, index) => ({ data: "#A" + index })) },
      { group: new Array(10).fill(0).map((_, index) => ({ data: "#B" + index })) },
      { group: new Array(10).fill(0).map((_, index) => ({ data: "#C" + index })) },
      { group: new Array(10).fill(0).map((_, index) => ({ data: "#D" + index })) }
]

describe('IvueVirtualCollection', () => {
      it('can render cells correctly', () => {
            const wrapper = shallowMount(
                  IvueVirtualCollection,
                  {
                        propsData: {
                              cellSizeAndPositionGetter,
                              collection: items,
                              height: 300,
                              width: 500
                        },
                        scopedSlots: {
                              cell: '<div slot-scope="props">{{props.data}}</div>'
                        }
                  }
            )

            setTimeout(() => {
                  expect(wrapper.findAll('.cell-container').length >= 4).to.be.true;
                  expect(wrapper.text()).to.be.equal('#0#1#2#3');
            }, 0)
      });


      it('can render cells when items are grouped', () => {
            const wrapper = shallowMount(
                  IvueVirtualCollection,
                  {
                        propsData: {
                              cellSizeAndPositionGetter: groupedCellSizeAndPositionGetter,
                              collection: groups,
                              height: 300,
                              width: 500
                        },
                        scopedSlots: {
                              cell: '<div slot-scope="props">{{props.data}}</div>'
                        }
                  }
            )

            const groupA = '#A0#A1#A2#A3'
            const groupB = '#B0#B1#B2#B3'
            const groupC = '#C0#C1#C2#C3'


            setTimeout(() => {
                  expect(wrapper.findAll('.cell-container').length >= 12).to.be.true
                  expect(wrapper.text()).to.be.equal(groupA + groupB + groupC)
            }, 0)
      });


      it('will not render cells if width or height equals zero', () => {
            const wrapper1 = shallowMount(
                  IvueVirtualCollection,
                  {
                        propsData: {
                              cellSizeAndPositionGetter,
                              collection: items,
                              height: 0,
                              width: 500
                        },
                        scopedSlots: {
                              cell: '<div slot-scope="props">{{props.data}}</div>'
                        }
                  }
            )

            expect(wrapper1.findAll('.cell-container').length).to.equal(0)

            const wrapper2 = shallowMount(
                  IvueVirtualCollection,
                  {
                        propsData: {
                              cellSizeAndPositionGetter,
                              collection: items,
                              height: 500,
                              width: 0
                        },
                        scopedSlots: {
                              cell: '<div slot-scope="props">{{props.data}}</div>'
                        }
                  }
            )
            expect(wrapper2.findAll('.cell-container').length).to.equal(0)
      });


      it('can correctly render cells if data change', () => {
            let changedData = new Array(1000).fill(0).map((_, index) => ({ data: '#' + index }))
            const wrapper1 = shallowMount(
                  IvueVirtualCollection,
                  {
                        propsData: {
                              cellSizeAndPositionGetter,
                              collection: changedData,
                              height: 500,
                              width: 500
                        },
                        scopedSlots: {
                              cell: '<div slot-scope="props">{{props.data}}</div>'
                        }
                  }
            )

            setTimeout(() => {
                  expect(wrapper1.text()).to.equal("#0#1#2#3#4#5#6#7")
            },0)


            setTimeout(() => {
                  wrapper1.setProps({ collection: changedData.slice(-2) })
                  setTimeout(() => {
                        expect(wrapper1.text()).to.equal("#998#999")
                  })
            }, 1)
      });

});