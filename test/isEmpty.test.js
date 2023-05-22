const {isEmpty} = require('../app');

describe('isEmpty test', () => {

    it('should returns true when array is empty', () => {
        let emptyArray = new Array();

        expect(isEmpty(emptyArray)).toEqual(true);
    });

    it('should returns false when array is not empty', () => {
        let array = [1,2,3];

        expect(isEmpty(array)).toEqual(false);
    });

    it('should returns false when given parameter is not an array', () => {
        let notAnArray = {};

        expect(isEmpty(notAnArray)).toEqual(false);
    });

    it('should returns false when array contain only one element', () => {
        let oneElementArray = [false];

        expect(isEmpty(oneElementArray)).toEqual(false);
    });


});