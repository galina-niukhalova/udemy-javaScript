
// --------------
// LET and CONST

// ES5
var name = 'Jane Smith';

// ES6 
// const name6 = 'Jane Smith'; // can't change the value of this variable
// let age = 26;

// var - function scoped,
// let and var - block scoped

function scoped5(isTrue) {
    if (isTrue) {
        console.log(a); // a = undefined, because of hosting
        var a = 5;
    }
    console.log(a);
    // it works, because of function scoped
}

function scoped6(isTrue) {
    if (isTrue) {
        let a = 5;
        const b = 10;
    }
    console.log(a + b);
    // doesn't work, because (a and b) have block (if) scope
}

function scoped6(isTrue) {
    // in ES6 we can't use a variable before it declare
    console.log(a); //error

    let a = 5;
    const b = 10;

    if (isTrue) {
        a = 5;
    }
    console.log(a + b);
    // doesn't work, because (a and b) have block (if) scope
}


// -------------------
// Blocks and IIFEs

{
    let a = 5;
    const b = 6;
}

//  this is a block and outside I can't use a and b
//https://hashnode.com/post/do-es6-modules-make-the-case-of-iifes-obsolete-civ96wet80scqgc538un20es0


// -------------------
// Strings
let firstName = 'john';
let lastName = 'smith';
const yearOfBirthday = 1990;

function calcAge(year) {
    return 2018 - year;
}

// ES5
// console.log('This is ' + firstName + ' ' + lastName
//     + '. He was born in ' + yearOfBirthday
//     + '. Today, he is ' + calcAge(yearOfBirthday) + ' years old.');

// ES6 - Template literals
// console.log(`This is ${firstName} ${lastName}. ` +
//     `He was born in ${yearOfBirthday}. `
//     + `Today, he is ${calcAge(yearOfBirthday)} years old`);


// New Methods
const n = `${firstName} ${lastName}`; // John Smith
let booleanStart = n.startsWith('J'); // true
let booleanEnd = n.endsWith('th');    // true
let booleanInclude = n.includes(' '); // true

`${firstName} `.repeat(5); // john john john john john


// -------------------
// Arrow functions

const years = [1990, 1995, 1982, 1937];

// ES5
var ages5 = years.map(function (element) {
    return 2018 - element;
});

// ES6
let ages6 = years.map(el => 2018 - el);
ages6 = years.map((el, index, array) => `Age element ${index + 1}: ${2016 - el}.`);
ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`
});



// -------------------
// Arrow functions - 2

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        var self = this;

        document.querySelector('.green').addEventListener('click', function () {
            var str = 'This is box number ' + self.position + ' and it is '
                + self.color; // this = window
            alert(str);
        });
    }
};

let box6 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        // this = box6

        document.querySelector('.green').addEventListener('click', () => {
            let str = `This is box number ${this.position} and it is ${this.color}`;
            // this = box6 => surround = clickMe function
        });
    }
};


// let box6 = {
//     color: 'green',
//     position: 1,
//     clickMe: () => {
//         // this = window

//         document.querySelector('.green').addEventListener('click', () => {
//             let str = `This is box number ${this.position} and it is ${this.color}`; // this = window
//         });
//     }
// };

// arrow functions take this keyword from his surround



// ES5
function Person(name) {
    this.name = name;
}

Person.prototype.myFriend5 = function (friends) {
    var arr = friends.map(function (el) {
        return this.name + ' is friend with ' + el;
    }.bind(this));

    console.log(arr);
};

var friends = ['Bob', 'Jane', 'Mark'];
var person = new Person('John');


// ES6
Person.prototype.myFriend6 = function (friends) {
    let arr = friends.map(el => `${this.name} is friend with ${el}`);

    // console.log(arr);
};


person.myFriend6(friends);


// -------------------
// Destructuring

// ES5
var john = ['John', 26];
var name5 = john[0];
var age5 = john[1];

// ES6
const [name6, age6] = ['John', 26];
// name6 = 'John', age6 = 26

const obj = {
    firstName: 'John',
    lastName_: 'Smith'
};

let { fisrtName, lastName_ } = obj;
// name of key = name of variables
// firstName = obj.firstName
// lastName = obj.lastName

// if we don't want key name = variable's name
let { firstName: fstName, lastName: lstName } = obj;



function calcAgeAndReturement(year) {
    const age = new Date().getFullYear() - year;

    return [age, 65 - age];
}

let [age, retirement] = calcAgeAndReturement(1990);


// -------------------
// Arrays
const boxes = document.querySelectorAll('.box'); // NodeList

// ES5
var boxes5 = Array.prototype.slice.call(boxes);
// boxes5.forEach(function(el) {
//     el.style.backgroundColor = 'dodgerblue';
// });

// ES6
const boxes6 = Array.from(boxes);
boxes6.forEach(el => el.style.backgroundColor = 'dodgerblue');


// continue; break
// ES5
// for (var i = 0; i < boxes5.length; i++) {
//     if(boxes5[i].className === 'box blue') continue;

//     boxes5[i].textContent = 'I\'m blue too!';
// }

// ES6
for (const cur of boxes6) {
    if (cur.className.includes('blue')) continue;

    cur.textContent = 'I\'m blue too!';
}

// ES5
var ages = [12, 17, 8, 21, 14, 11];

var full = ages.map(function (cur) {
    return cur >= 18;
});

var fullAge = ages[full.indexOf(true)];


// ES6
// findIndex and find
ages.findIndex((el, index, array) => el >= 18);
ages.find(cur => cur >= 18);



// -------------------
// Spread operator

function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum = addFourAges(18, 30, 12, 21);

// ES5 
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);

// ES6
const sum3 = addFourAges(...ages);
// ... spread aray into functions arguments


// join arrays
const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily1 = [...familySmith, ...familyMiller]; //["John", "Jane", "Mark", "Mary", "Bob", "Ann"]
const bigFamily2 = [...familySmith, 'Lily', ...familyMiller]; //["John", "Jane", "Mark", "Lily", "Mary", "Bob", "Ann"]

// can use ... not only with array
// this example for NodeList
const h = document.querySelector('h1');
const boxes_ = document.querySelectorAll('.box');
const all = [h, ...boxes_]; //[h1, div.box.green, div.box.blue, div.box.orange]



// -------------------
// Rest parametrs

// ES5
// use arguments
// function isFullAge5() {
//     var atgsArray = Array.prototype.slice.call(arguments);

//     atgsArray.forEach(function(cur) {
//         console.log((2018 - cur) >= 18);
//     });
// }

// isFullAge5(1990, 2005, 1965);


// ES6
// transform param into array 'years' and pass into fun
// function isFullAge6(...years) {
//     years.forEach(el => console.log((2018-el) >= 18));
// }

// isFullAge6(1990, 2005, 1965);


// ES5
// use arguments and add extra parametrs
function isFullAge5(limit) {
    var atgsArray = Array.prototype.slice.call(arguments, 1);

    atgsArray.forEach(function (cur) {
        console.log((2018 - cur) >= limit);
    });
}

// isFullAge5(21, 1990, 2005, 1965);


// ES6
// transform param into array 'years' and pass into fun
function isFullAge6(limit, ...years) {
    years.forEach(el => console.log((2018 - el) >= limit));
}

// isFullAge6(21, 1990, 2005, 1965);


// -------------------
// Defualt parametrs

// one of more param are default

// ES5
function SmithPerson(firstName, yearOfBirthday, lastName, nationality) {
    lastName = lastName || 'Smith';
    nationality = nationality || 'american';

    this.firstName = firstName;
    this.yearOfBirthday = yearOfBirthday;
    this.lastName = lastName;
    this.nationality = nationality;
}

// var john = new SmithPerson('John', 1990); // lastName = undifined, nationality = undifined
// var emely = new SmithPerson('Emily', 1983, 'Diaz', 'spanish');


// ES6
function SmithPerson(firstName, yearOfBirthday, lastName = 'Smith', nationality = 'american') {
    this.firstName = firstName;
    this.yearOfBirthday = yearOfBirthday;
    this.lastName = lastName;
    this.nationality = nationality;
}

// const john_ = new SmithPerson('John', 1990); // lastName = undifined, nationality = undifined
// const emely = new SmithPerson('Emily', 1983, 'Diaz', 'spanish');


// -------------------
// Maps

// ES5
// we used objects
// as key we could use only strings



// ES6
// as key we can use any primitives parametrs, functions, objects
const question = new Map();
question.set('question', 'What is the official name of the latest major JS version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);

question.set(true, 'correct answer');
question.set(false, 'wrong, please try again');

// get
question.get('question');

// get size
question.size;

// delete 
// if(question.has(4)) question.delete(4);

// delete all elements
// question.clear();


// can loop through the map
question.forEach((value, key, map) => {
    // console.log(`This is ${key}, and it's set to ${value}`);
});

for (let [key, value] of question.entries()) {
    // if (typeof (key) === 'number') console.log(`Answer ${key}: ${value}`);
}

// const ans = parseInt(prompt('Write the correct answer'));
// console.log(question.get(question.get('correct') === ans));


// Classes

// ES5
var Person5 = function (name, yearOfBirthday, job) {
    this.name = name;
    this.yearOfBirthday = yearOfBirthday;
    this.job = job;
};

Person5.prototype.calculateAge = function () {
    var age = new Date().getFullYear() - this.yearOfBirthday;
    console.log(age);
};

// var john5 = new Person5('John', 1990, 'teacher');
// john5.calculateAge();


// ES6
class Person6 {
    constructor(name, yearOfBirthday, job) {
        this.name = name;
        this.yearOfBirthday = yearOfBirthday;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirthday;
        console.log(age);
    }
}

const john6 = new Person6('John', 1990, 'teacher');
// console.log(john6);


// Inheritance using subclasses

// ES5
var Person5 = function (name, yearOfBirthday, job) {
    this.name = name;
    this.yearOfBirthday = yearOfBirthday;
    this.job = job;
};

var Athlet5 = function (name, yearOfBirthday, job, olympicGames, medals) {
    Person5.call(this, name, yearOfBirthday, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
};

Athlet5.prototype = Object.create(Person5.prototype);
Athlet5.prototype.wonMedal = function () {
    this.medals++;
    console.log(this.medals);
}

var johnAthlet5 = new Athlet5('John', 1990, 'swimmer', 3, 10);

// ES6
class Person6_ {
    constructor(name, yearOfBirthday, job) {
        this.name = name;
        this.yearOfBirthday = yearOfBirthday;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirthday;
        // console.log(age);
    }
}

// inheritance
class Athlet6 extends Person6_ {
    constructor(name, yearOfBirthday, job, olympicGames, medals) {
        super(name, yearOfBirthday, job);

        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        // console.log(this.medals);
    }
}

const johnAthlet6 = new Athlet6('John', 1990, 'swimmer', 3, 10);
johnAthlet6.calculateAge();
johnAthlet6.wonMedal();


// Challenge
class TownElement {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

// Parks
class Park extends TownElement {
    constructor(name, buildYear, numberOfTrees, parkArea) {
        super(name, buildYear);

        this.numberOfTrees = numberOfTrees;
        this.parkArea = parkArea;
    }

    calcTreeDensity() {
        return this.numberOfTrees / this.parkArea;
    }

    calcAge() {
        return (new Date().getFullYear() - this.buildYear);
    }

    getNumberOfTrees() {
        return this.numberOfTrees;
    }
}

const greenPark = new Park('Green Park', 1990, 200, 1000);
const nationalPark = new Park('National Park', 1995, 4000, 1500);
const oakPark = new Park('Oak Park', 2000, 100, 3000);
const parks = [greenPark, nationalPark, oakPark];

function calc(arr) {
    const sum = arr.reduce((prev, cur, ind) => prev + cur, 0);

    return [sum, sum/arr.length];
}

findPark = function (limit) {
    return parks.find(el => {
        return el.getNumberOfTrees() > limit;
    });
}

function printParkReport(parks) {
    console.log(`---- PARKS REPORT ----`);

    const ages = parks.map(park => {return park.calcAge()});

    const [total, avgAge] = calc(ages);

    console.log(`Our ${parks.length} parks have an average age of ${avgAge} years.`);
    parks.forEach(park => {
        console.log(`${park.name} has a tree density of ${park.calcTreeDensity()} trees per squere km`);
    });

    console.log(`${findPark(1000).name} has more than 1000 trees`);
}



// Streets
class Street extends TownElement {
    constructor(name, buildYear, length, size=3) {
        super(name, buildYear);

        this.length = length;
        this.size = size;
    }

    classifyStreet () {
        const classification = new Map();

        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');

        return classification.get(this.size);
    }
}

const oceanAvenue = new Street('Ocean Avenue', 1990, 200, 4);
const evergreenStreet = new Street('Evergreen Street', 1995, 300, 2);
const forthStreet = new Street('4th Street', 2000, 250);
const sunsetBoulevard = new Street('Sunset Boulevard', 2013, 500, 5);

let streets = [oceanAvenue, evergreenStreet, forthStreet, sunsetBoulevard];


function printReport(streets) {
    console.log(`---- STREETS REPORT ----`);

    const lengths = streets.map(street => {return street.length});
    const [total, average] = calc(lengths);

    console.log(`Our ${streets.length} streets have a total length of ${total} km, with an average of ${average} km`);
    
    streets.forEach(street => {
        console.log(`${street.name}, build in ${street.buildYear}, is a ${street.classifyStreet()} street`);
    });
}

printParkReport(parks);
printReport(streets);