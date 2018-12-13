import MonthChange from '../../../../src/utils/MonthChange';


describe('IVueDatePicker/util/MonthChange', function () {
      it('should change month',  () => {
            expect(MonthChange('2018-12', -1)).to.be.equal('2018-11');
            expect(MonthChange('2018-12', 1)).to.be.equal('2019-01');
            expect(MonthChange('2018-01', 1)).to.be.equal('2018-02');
            expect(MonthChange('2018-01', -1)).to.be.equal('2017-12');
      });
});