const data = require('./data');

'use strict'

const args = process.argv

/**
 * 
 * @param {Array} arr - An array
 * @returns {true} if arr is not an array or is an empty array
 * @returns {false} if arr is not empty
 */
function isEmpty(arr) {
    if (!Array.isArray(arr)){
        return false;
    }
    return (arr.length <= 0);
}

// This function filters out every animal that does not match the string pattern
const removeNonMatching = (searchedStr, person) => {
    return person.animals.map((animal) => {
        if (animal.name.includes(searchedStr)) {
            return animal;
        }
    }).filter(e => e)
}

const filter = (searchedStr) => {
    // Copy of initial data
    let dataListCopy = JSON.parse(JSON.stringify(data)); 
    // Filter on data list copy
    const newList = dataListCopy.filter(q => {
        let newCountry = q 
        // Filter on people list 
        newCountry.people = q.people.filter(p => {
            let newPerson = p
            // Remove animals of person that does not maching to searchedStr
            newPerson.animals = removeNonMatching(searchedStr, p)

            // The 'animals' entry will be removed if there is nothing left inside
            return !isEmpty(newPerson.animals)
        })

        // The 'people' entry will be removed if there is nothing left inside
        return (!isEmpty(newCountry.people))
    });

    // prints out the filtered list if there is any match
    return (isEmpty(newList)) ? 'Nothing found' : JSON.stringify(newList)
}

/**
 * Count the direct children of Country and People in data
 * @param {string} data 
 * @returns modified string with counts values
 */
const count = (data) => {
    // Copy of initial data
    let dataListCopy = JSON.parse(data); 

    const newList = dataListCopy.map((country) => {
        country.people.map((person) => {
            person.name = `${person.name} [${person.animals.length}]`
            return person
        })
        country.name = `${country.name} [${country.people.length}]`
        return country
    })
    return JSON.stringify(newList)
}


// USAGE: node app.js --filter=[PATTERN] OR node app.js filter=[PATTERN]
// USAGE: node app.js --count OR node app.js count

try {
    
    // Boolean to check which parameter is present
    let countIsPresent = false;
    let filterIsPresent = false;

    let workingData = JSON.stringify(data);

    // Save the pattern for filter
    let filterPattern = null;

    // Search for present args by looping in args array
    args.forEach((arg) => {
        if (arg === '--count' || arg === 'count') {
        countIsPresent = true;
        } else if (arg.startsWith('--filter=') || arg.startsWith('filter=')) {
            filterPattern = arg.split('=')[1];
            filterIsPresent = true;
        }
    });

    workingData = filterIsPresent ? filter(filterPattern) : workingData;
    workingData = countIsPresent ? count(workingData) : workingData;

    console.log(workingData || 'Wrong arguments');

} catch(err) {
    throw err
}


module.exports = {
    count, filter, isEmpty
}
