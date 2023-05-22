const {filter} = require('../app');
const data = require('../data');


describe('filter test', () => {
    it('should show the animals matching with the ry string pattern', () => {
        const result = filter('ry');

        expect(result).toEqual('[{"name":"Uzuzozne","people":[{"name":"Lillie Abbott","animals":[{"name":"John Dory"}]}]},{"name":"Satanwi","people":[{"name":"Anthony Bruno","animals":[{"name":"Oryx"}]}]}]');
    });

    it('should show the animals matching with the uz string pattern', () => {
        const result = filter('uz');

        expect(result).toEqual('[{"name":"Dillauti","people":[{"name":"Philip Murray","animals":[{"name":"Buzzard"}]}]}]');
    });

    it('should show nothing found when no animals math the string pattern', () => {
        const result = filter("unknowanimal");

        expect(result).toEqual('Nothing found');
    });

    it('should remove animals that does not match the string pattern', () =>{
        const pattern = 'ck';
        const animalThatDoesNotMatchPattern = 'Mice';
        let animalFounded = false;

        const filteredList = JSON.parse(filter(pattern));

        /** 
         * Compare animals of people with animal that does not match the string pattern.
         * If the animal is founded, then the filter does not works correctly.
        */
        Object.keys(filteredList).forEach(function(key) {
            const value = filteredList[key];
            value['people'].forEach(people => {
                if (people.animals.includes(animalThatDoesNotMatchPattern)){
                    animalFounded = true;
                    return;
                }
            });
        });

        // Then, animalFounded should be false
        expect(animalFounded).toEqual(false);
    });

    it('should remove people whose animal does not match the pattern ', () =>{
        const pattern = 'ba';
        const unwantedPeople = [
            'Winifred Graham','Blanche Viciani','Philip Murray','Bobby Ristori','Louise Pinzauti','Essie Bennett','Alexander Fleury',
            'Curtis Fuchs','Maud Lorenzo','Linnie Lamb','Randall Benoît','Harold Patton','Millie Lapini','Lina Allen',
            'Georgia Hooper','Lillie Abbott','Elva Baroni','Johnny Graziani','Herman Christensen','Fannie Ancillotti',
            'Marion Landi','Lou de Bruin','Elmer Kinoshita','Cora Howell','Ernest Conte','Dennis Franci','Anthony Bruno',
        ];
        let anUnwantedPeopleHasBeenFound = false;

        const filteredList = JSON.parse(filter(pattern));

        /**
         * For each people, search his name in the unwantedPeople array.
         * If it is found, set the value of anUnwantedPeopleHasBeenFound to true
         */
        Object.keys(filteredList).forEach(function(key) {
            const value = filteredList[key];
            value['people'].forEach(people => {
                if (unwantedPeople.includes(people.name)){
                    anUnwantedPeopleHasBeenFound = true;
                    return;
                }
            });
        });

        // If the filter does his works correctly, no unwanted people has to be found. 
        expect(anUnwantedPeopleHasBeenFound).toEqual(false);
    });

    it('should keep intact the order of countries', () =>{
        let initialOrderOfCountries = [];
        // Get the initial order of countries
        data.forEach(country => {
            initialOrderOfCountries.push(country.name);
        });

        // Call filter, the string pattern must returns some values 
        const filteredList = JSON.parse(filter('ab'));

        // Get order of countries in filteredList
        filteredListCountriesOrder = [];
        filteredList.forEach(country => {
            filteredList.push(country.name);
        });

        // Now, verify that orders are the same
        let isOrderCorrect = true;
        // Last index found
        let lastIndex = -1;
        filteredListCountriesOrder.forEach(countryName => {
            const index = initialOrderOfCountries.indexOf(countryName);

            // If country not found or have an index < lastIndex, then the order is not respected 
            if (index === -1 || index <= lastIndex){
                isOrderCorrect = false;
                return;
            }

            // If country is found and order is correct for now,
            lastIndex = index;
        });
        
        // Finally, test isOrderCorrect == true
        expect(isOrderCorrect).toEqual(true);


    });

    it('should keep intact the order of people', () =>{
        let initialOrderOfPeople = [];
        // Get the initial order of people
        data.forEach(country => {
            country.people.forEach(people => {
                initialOrderOfPeople.push(people.name);
            });
        });

        // Call filter, the string pattern must returns some values 
        const filteredList = JSON.parse(filter('ab'));

        // Get order of people in filteredList
        filteredListPeoplesOrder = [];
        filteredList.forEach(country => {
            country.people.forEach(people => {
                filteredListPeoplesOrder.push(people.name);
            });
        });

        // Now, verify that orders are the same
        let isOrderCorrect = true;
        // Last index found
        let lastIndex = -1;
        filteredListPeoplesOrder.forEach(people => {
            const index = initialOrderOfPeople.indexOf(people);

            // If people not found or have an index < lastIndex, then the order is not respected 
            if (index === -1 || index <= lastIndex){
                isOrderCorrect = false;
                return;
            }

            // If people is found and order is correct for now,
            lastIndex = index;
        });

        expect(isOrderCorrect).toEqual(true);

    });

    it('should keep intact the order of animals', () =>{

        const stringPattern = 'ab';

        // Expected order after filter 'ab'
        const expectedOrder = [
            'Aldabra Tortoise',
            'Aldabra Tortoise',
            'Rabbit',
            'Baby Doll Sheep',
            'Rabbits',
            'Rabbit',
            'Rabbit',
            'Rabbit',
        ];

        const filteredList = JSON.parse(filter(stringPattern));

        // Get order of animals in filteredList
        filteredListAnimalsOrder = [];
        filteredList.forEach(country => {
            country.people.forEach(people => {
                people.animals.forEach(animal => {
                    filteredListAnimalsOrder.push(animal.name);
                });
            });
        });

        const sameOrder = (JSON.stringify(expectedOrder) === JSON.stringify(filteredListAnimalsOrder));

        expect(sameOrder).toEqual(true);

        
    });
});
