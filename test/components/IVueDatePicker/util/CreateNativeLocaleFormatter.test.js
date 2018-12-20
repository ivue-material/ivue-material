import CreateNativeLocaleFormatter from '../../../../src/utils/CreateNativeLocaleFormatter';

describe('IvueDatePicker/util/CreateNativeLocaleFormatter', function () {
      it('should format dates', () => {
            const formatter = CreateNativeLocaleFormatter('en-us', { day: 'numeric', timeZone: 'UTC' });

            expect(formatter('2018-2-04')).to.be.equal('4');
      });

      it('should format dates if Intl is not defined', () => {
            const oldIntl = global.Intl;

            global.Intl = null;

            const formatter = CreateNativeLocaleFormatter('en-us', { day: 'numeric', timeZone: 'UTC' }, { start: 0, length: 10 });

            expect(formatter('2018-2-4')).to.be.equal('2018-02-04');
            expect(formatter('2018-2')).to.be.equal('2018-02-01');
            expect(formatter('2018')).to.be.equal('2018-01-01');

            const nullFormatter = CreateNativeLocaleFormatter('en-us', { day: 'numeric', timeZone: 'UTC' });

            expect(nullFormatter).to.be.equal(null);
            global.Intl = oldIntl;
      });

});