import Pad from '../../../../src/utils/pad';


describe('IvueDatePicker/util/Pad', function () {
      it('should pad 1-digit numbers',  () => {
            expect(Pad(0)).to.be.equal('00');
            expect(Pad('3', 3)).to.be.equal('003');
      });

      it('should pad 2-digit numbers',  () => {
            expect(Pad(40)).to.be.equal('40');
            expect(Pad('98')).to.be.equal('98');
      });

      it('should pad 3-digit numbers',  () => {
            expect(Pad(400)).to.be.equal('400');
            expect(Pad('998')).to.be.equal('998');
      });
});