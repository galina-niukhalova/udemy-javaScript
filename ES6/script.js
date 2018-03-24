
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
console.log('This is ' + firstName + ' ' + lastName
    + '. He was born in ' + yearOfBirthday
    + '. Today, he is ' + calcAge(yearOfBirthday) + ' years old.');

// ES6 - Template literals
console.log(`This is ${firstName} ${lastName}. ` +
    `He was born in ${yearOfBirthday}. `
    + `Today, he is ${calcAge(yearOfBirthday)} years old`);


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

    console.log(arr);
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
