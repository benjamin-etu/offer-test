const {count} = require('../app.js');
const data = require('../data');

describe('count test', () => {

    let result;

    beforeAll(() => {
        result = JSON.parse(count(JSON.stringify(data)));
    });
      
    it('should show the correct number of peoples for country', () => {
        const countryTest = 'Dillauti';
        const expectedNumberOfPeoples = 5;
        const expectedString = `${countryTest} [${expectedNumberOfPeoples}]`;

        expect(result[0].name).toEqual(expectedString);
    });

    it('should show the correct number of animals for people', ()=> {
        const peopleTest = 'Harold Patton';
        const expectedNumberOfAnimals = 8;
        const expectedString = `${peopleTest} [${expectedNumberOfAnimals}]`;

        expect(result[2].people[0].name).toEqual(expectedString);
    })
});
