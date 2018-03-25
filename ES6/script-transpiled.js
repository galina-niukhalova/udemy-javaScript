'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
        var _a = 5;
        var _b = 10;
    }
    console.log(a + b);
    // doesn't work, because (a and b) have block (if) scope
}

function scoped6(isTrue) {
    // in ES6 we can't use a variable before it declare
    console.log(a); //error

    var a = 5;
    var b = 10;

    if (isTrue) {
        a = 5;
    }
    console.log(a + b);
    // doesn't work, because (a and b) have block (if) scope
}

// -------------------
// Blocks and IIFEs

{
    var _a2 = 5;
    var _b2 = 6;
}

//  this is a block and outside I can't use a and b
//https://hashnode.com/post/do-es6-modules-make-the-case-of-iifes-obsolete-civ96wet80scqgc538un20es0


// -------------------
// Strings
var firstName = 'john';
var lastName = 'smith';
var yearOfBirthday = 1990;

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
var n = firstName + ' ' + lastName; // John Smith
var booleanStart = n.startsWith('J'); // true
var booleanEnd = n.endsWith('th'); // true
var booleanInclude = n.includes(' '); // true

(firstName + ' ').repeat(5); // john john john john john


// -------------------
// Arrow functions

var years = [1990, 1995, 1982, 1937];

// ES5
var ages5 = years.map(function (element) {
    return 2018 - element;
});

// ES6
var ages6 = years.map(function (el) {
    return 2018 - el;
});
ages6 = years.map(function (el, index, array) {
    return 'Age element ' + (index + 1) + ': ' + (2016 - el) + '.';
});
ages6 = years.map(function (el, index) {
    var now = new Date().getFullYear();
    var age = now - el;
    return 'Age element ' + (index + 1) + ': ' + age + '.';
});

// -------------------
// Arrow functions - 2

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function clickMe() {
        var self = this;

        document.querySelector('.green').addEventListener('click', function () {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color; // this = window
            alert(str);
        });
    }
};

var box6 = {
    color: 'green',
    position: 1,
    clickMe: function clickMe() {
        var _this = this;

        // this = box6

        document.querySelector('.green').addEventListener('click', function () {
            var str = 'This is box number ' + _this.position + ' and it is ' + _this.color;
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
    var _this2 = this;

    var arr = friends.map(function (el) {
        return _this2.name + ' is friend with ' + el;
    });

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
var name6 = 'John',
    age6 = 26;
// name6 = 'John', age6 = 26

var obj = {
    firstName: 'John',
    lastName_: 'Smith'
};

var fisrtName = obj.fisrtName,
    lastName_ = obj.lastName_;
// name of key = name of variables
// firstName = obj.firstName
// lastName = obj.lastName

// if we don't want key name = variable's name

var fstName = obj.firstName,
    lstName = obj.lastName;


function calcAgeAndReturement(year) {
    var age = new Date().getFullYear() - year;

    return [age, 65 - age];
}

var _calcAgeAndReturement = calcAgeAndReturement(1990),
    _calcAgeAndReturement2 = _slicedToArray(_calcAgeAndReturement, 2),
    age = _calcAgeAndReturement2[0],
    retirement = _calcAgeAndReturement2[1];

// -------------------
// Arrays


var boxes = document.querySelectorAll('.box'); // NodeList

// ES5
var boxes5 = Array.prototype.slice.call(boxes);
// boxes5.forEach(function(el) {
//     el.style.backgroundColor = 'dodgerblue';
// });

// ES6
var boxes6 = Array.from(boxes);
boxes6.forEach(function (el) {
    return el.style.backgroundColor = 'dodgerblue';
});

// continue; break
// ES5
// for (var i = 0; i < boxes5.length; i++) {
//     if(boxes5[i].className === 'box blue') continue;

//     boxes5[i].textContent = 'I\'m blue too!';
// }

// ES6
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = boxes6[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var cur = _step.value;

        if (cur.className.includes('blue')) continue;

        cur.textContent = 'I\'m blue too!';
    }

    // ES5
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

var ages = [12, 17, 8, 21, 14, 11];

var full = ages.map(function (cur) {
    return cur >= 18;
});

var fullAge = ages[full.indexOf(true)];

// ES6
// findIndex and find
ages.findIndex(function (el, index, array) {
    return el >= 18;
});
ages.find(function (cur) {
    return cur >= 18;
});

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
var sum3 = addFourAges.apply(undefined, ages);
// ... spread aray into functions arguments


// join arrays
var familySmith = ['John', 'Jane', 'Mark'];
var familyMiller = ['Mary', 'Bob', 'Ann'];
var bigFamily1 = [].concat(familySmith, familyMiller); //["John", "Jane", "Mark", "Mary", "Bob", "Ann"]
var bigFamily2 = [].concat(familySmith, ['Lily'], familyMiller); //["John", "Jane", "Mark", "Lily", "Mary", "Bob", "Ann"]

// can use ... not only with array
// this example for NodeList
var h = document.querySelector('h1');
var boxes_ = document.querySelectorAll('.box');
var all = [h].concat(_toConsumableArray(boxes_)); //[h1, div.box.green, div.box.blue, div.box.orange]


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
        console.log(2018 - cur >= limit);
    });
}

// isFullAge5(21, 1990, 2005, 1965);


// ES6
// transform param into array 'years' and pass into fun
function isFullAge6(limit) {
    for (var _len = arguments.length, years = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        years[_key - 1] = arguments[_key];
    }

    years.forEach(function (el) {
        return console.log(2018 - el >= limit);
    });
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
function SmithPerson(firstName, yearOfBirthday) {
    var lastName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Smith';
    var nationality = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'american';

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
var question = new Map();
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
question.forEach(function (value, key, map) {
    // console.log(`This is ${key}, and it's set to ${value}`);
});

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
    for (var _iterator2 = question.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _slicedToArray(_step2.value, 2),
            key = _step2$value[0],
            value = _step2$value[1];
    }
    // if (typeof (key) === 'number') console.log(`Answer ${key}: ${value}`);


    // const ans = parseInt(prompt('Write the correct answer'));
    // console.log(question.get(question.get('correct') === ans));


    // Classes

    // ES5
} catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
        }
    } finally {
        if (_didIteratorError2) {
            throw _iteratorError2;
        }
    }
}

var Person5 = function Person5(name, yearOfBirthday, job) {
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

var Person6 = function () {
    function Person6(name, yearOfBirthday, job) {
        _classCallCheck(this, Person6);

        this.name = name;
        this.yearOfBirthday = yearOfBirthday;
        this.job = job;
    }

    _createClass(Person6, [{
        key: 'calculateAge',
        value: function calculateAge() {
            var age = new Date().getFullYear() - this.yearOfBirthday;
            console.log(age);
        }
    }]);

    return Person6;
}();

var john6 = new Person6('John', 1990, 'teacher');
// console.log(john6);


// Inheritance using subclasses

// ES5
var Person5 = function Person5(name, yearOfBirthday, job) {
    this.name = name;
    this.yearOfBirthday = yearOfBirthday;
    this.job = job;
};

var Athlet5 = function Athlet5(name, yearOfBirthday, job, olympicGames, medals) {
    Person5.call(this, name, yearOfBirthday, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
};

Athlet5.prototype = Object.create(Person5.prototype);
Athlet5.prototype.wonMedal = function () {
    this.medals++;
    console.log(this.medals);
};

var johnAthlet5 = new Athlet5('John', 1990, 'swimmer', 3, 10);

// ES6

var Person6_ = function () {
    function Person6_(name, yearOfBirthday, job) {
        _classCallCheck(this, Person6_);

        this.name = name;
        this.yearOfBirthday = yearOfBirthday;
        this.job = job;
    }

    _createClass(Person6_, [{
        key: 'calculateAge',
        value: function calculateAge() {
            var age = new Date().getFullYear() - this.yearOfBirthday;
            // console.log(age);
        }
    }]);

    return Person6_;
}();

// inheritance


var Athlet6 = function (_Person6_) {
    _inherits(Athlet6, _Person6_);

    function Athlet6(name, yearOfBirthday, job, olympicGames, medals) {
        _classCallCheck(this, Athlet6);

        var _this3 = _possibleConstructorReturn(this, (Athlet6.__proto__ || Object.getPrototypeOf(Athlet6)).call(this, name, yearOfBirthday, job));

        _this3.olympicGames = olympicGames;
        _this3.medals = medals;
        return _this3;
    }

    _createClass(Athlet6, [{
        key: 'wonMedal',
        value: function wonMedal() {
            this.medals++;
            // console.log(this.medals);
        }
    }]);

    return Athlet6;
}(Person6_);

var johnAthlet6 = new Athlet6('John', 1990, 'swimmer', 3, 10);
johnAthlet6.calculateAge();
johnAthlet6.wonMedal();

// Challenge

var TownElement = function TownElement(name, buildYear) {
    _classCallCheck(this, TownElement);

    this.name = name;
    this.buildYear = buildYear;
};

// Parks


var Park = function (_TownElement) {
    _inherits(Park, _TownElement);

    function Park(name, buildYear, numberOfTrees, parkArea) {
        _classCallCheck(this, Park);

        var _this4 = _possibleConstructorReturn(this, (Park.__proto__ || Object.getPrototypeOf(Park)).call(this, name, buildYear));

        _this4.numberOfTrees = numberOfTrees;
        _this4.parkArea = parkArea;
        return _this4;
    }

    _createClass(Park, [{
        key: 'calcTreeDensity',
        value: function calcTreeDensity() {
            return this.numberOfTrees / this.parkArea;
        }
    }, {
        key: 'calcAge',
        value: function calcAge() {
            return new Date().getFullYear() - this.buildYear;
        }
    }, {
        key: 'getNumberOfTrees',
        value: function getNumberOfTrees() {
            return this.numberOfTrees;
        }
    }]);

    return Park;
}(TownElement);

var greenPark = new Park('Green Park', 1990, 200, 1000);
var nationalPark = new Park('National Park', 1995, 4000, 1500);
var oakPark = new Park('Oak Park', 2000, 100, 3000);
var parks = [greenPark, nationalPark, oakPark];

function calc(arr) {
    var sum = arr.reduce(function (prev, cur, ind) {
        return prev + cur;
    }, 0);

    return [sum, sum / arr.length];
}

findPark = function findPark(limit) {
    return parks.find(function (el) {
        return el.getNumberOfTrees() > limit;
    });
};

function printParkReport(parks) {
    console.log('---- PARKS REPORT ----');

    var ages = parks.map(function (park) {
        return park.calcAge();
    });

    var _calc = calc(ages),
        _calc2 = _slicedToArray(_calc, 2),
        total = _calc2[0],
        avgAge = _calc2[1];

    console.log('Our ' + parks.length + ' parks have an average age of ' + avgAge + ' years.');
    parks.forEach(function (park) {
        console.log(park.name + ' has a tree density of ' + park.calcTreeDensity() + ' trees per squere km');
    });

    console.log(findPark(1000).name + ' has more than 1000 trees');
}

// Streets

var Street = function (_TownElement2) {
    _inherits(Street, _TownElement2);

    function Street(name, buildYear, length) {
        var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3;

        _classCallCheck(this, Street);

        var _this5 = _possibleConstructorReturn(this, (Street.__proto__ || Object.getPrototypeOf(Street)).call(this, name, buildYear));

        _this5.length = length;
        _this5.size = size;
        return _this5;
    }

    _createClass(Street, [{
        key: 'classifyStreet',
        value: function classifyStreet() {
            var classification = new Map();

            classification.set(1, 'tiny');
            classification.set(2, 'small');
            classification.set(3, 'normal');
            classification.set(4, 'big');
            classification.set(5, 'huge');

            return classification.get(this.size);
        }
    }]);

    return Street;
}(TownElement);

var oceanAvenue = new Street('Ocean Avenue', 1990, 200, 4);
var evergreenStreet = new Street('Evergreen Street', 1995, 300, 2);
var forthStreet = new Street('4th Street', 2000, 250);
var sunsetBoulevard = new Street('Sunset Boulevard', 2013, 500, 5);

var streets = [oceanAvenue, evergreenStreet, forthStreet, sunsetBoulevard];

function printReport(streets) {
    console.log('---- STREETS REPORT ----');

    var lengths = streets.map(function (street) {
        return street.length;
    });

    var _calc3 = calc(lengths),
        _calc4 = _slicedToArray(_calc3, 2),
        total = _calc4[0],
        average = _calc4[1];

    console.log('Our ' + streets.length + ' streets have a total length of ' + total + ' km, with an average of ' + average + ' km');

    streets.forEach(function (street) {
        console.log(street.name + ', build in ' + street.buildYear + ', is a ' + street.classifyStreet() + ' street');
    });
}

printParkReport(parks);
printReport(streets);
