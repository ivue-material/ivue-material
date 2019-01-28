import { assert, expect } from "chai"
import SectionMessage from '../../../src/components/ivue-virtual-collection/section-message';

import { CELLS, SECTION_SIZE } from "./TestData"

function initSectionMessage () {
      const sectionMessage = new SectionMessage(SECTION_SIZE);
      CELLS.forEach((cellMetadatum, index) => {
            sectionMessage.registerCell({
                  cellMetadatum,
                  index
            })
      })

      return sectionMessage
}

function verifySections (sectionMessage, sizeAndPosition, expectedSizeAndPositionInfos) {
      const sections = sectionMessage.getSections(sizeAndPosition);

      expect(sections.length).equal(expectedSizeAndPositionInfos.length)

      expectedSizeAndPositionInfos.forEach((sizeAndPosition) => {
            const match = sections.find(
                  section => section.x === sizeAndPosition.x && section.y === sizeAndPosition.y
            )

            expect(!!match).equal(true)
      });


}

describe("SectionManager", function () {
      it("can be constructed", function () {

            const SectionMessage = initSectionMessage();
            assert(SectionMessage)
      });

      it("creates the appropriate number of Sections", () => {
            const SectionMessage = initSectionMessage();

            expect(SectionMessage.getTotalSectionCount()).equal(6)
      });

      it("returns the proper Sections based on the specified area", () => {
            const SectionMessage = initSectionMessage();

            verifySections(SectionMessage, { x: 0, y: 0, width: 1, height: 1 }, [{ x: 0, y: 0 }])
            verifySections(SectionMessage, { x: 1, y: 1, width: 1, height: 1 }, [{ x: 0, y: 0 }])
            verifySections(SectionMessage, { x: 0, y: 0, width: 4, height: 4 }, [
                  { x: 0, y: 0 },
                  { x: 2, y: 0 },
                  { x: 0, y: 2 },
                  { x: 2, y: 2 }
            ])
            verifySections(SectionMessage, { x: 4, y: 0, width: 2, height: 3 }, [
                  { x: 4, y: 0 },
                  { x: 4, y: 2 }
            ])
      });


      it("assigns cells to the appropriate sections", () => {
            const SectionMessage = initSectionMessage()
            expect(SectionMessage.getCellIndices({ x: 0, y: 0, width: 2, height: 2 })).to.deep.equal([0])
            expect(SectionMessage.getCellIndices({ x: 2, y: 0, width: 2, height: 2 })).to.deep.equal([1, 2, 3])
            expect(SectionMessage.getCellIndices({ x: 4, y: 0, width: 2, height: 2 })).to.deep.equal([6])
            expect(SectionMessage.getCellIndices({ x: 0, y: 2, width: 2, height: 2 })).to.deep.equal([4])
            expect(SectionMessage.getCellIndices({ x: 2, y: 2, width: 2, height: 2 })).to.deep.equal([3, 4, 5])
            expect(SectionMessage.getCellIndices({ x: 4, y: 2, width: 2, height: 2 })).to.deep.equal([7, 8, 9])
      });
})