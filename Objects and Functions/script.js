
/* -------------------------- */
/* Inheritance and Prototypes */

// function constructor
var Person = function (name, yearOfBirdthday, job) {
    this.name = name;
    this.yearOfBirdthday = yearOfBirdthday;
    this.job = job;

    // NOT a good idea
    // this.calc = function () {
    // code
    // }
}

// instantilation
// new create an empty obj
// this in Person => link to this new empty obj
var john = new Person('John', '1990', 'teacher');

// new obj has a copy of Person properties and methods
// so each instance of Person will have a copy of calc function
// because of duble of code, we use inheritance
Person.prototype.calc = function () {
}

// prototype - it's a property which each obj has
// all instance inherit all inside the prototype property



/* -------------------------- */
/* Object.create */

// 1. Create a prototype
var personProto = {
    calculateAge: function () {
        console.log(2018 - this.yearOfBirdthday);
    }
}

// create new obj with prototype personProto
var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirdthday = '1990';
john.job = 'teacher';

var jane = Object.create(personProto, {
    name: { value: 'Jane' },
    yearOfBirdthday: { value: '1969' },
    job: { value: 'designer' }
});


/* -------------------------- */
/*   Callback functions       */
var years = [1990, 1965, 1937, 2005, 1998];

// callback function
function calculateAge(el) {
    return 2018 - el;
}

function isFullAge(el) {
    return el >= 18 ? true : false;
}

function maxHeartRate(el) {
    if (el >= 18 && el <= 81)
        return Math.round(206.9 - (.67 * el));
    else
        return -1;
}

function arrayCalc(arr, fn) {
    var arrResult = [];

    for (var i = 0; i < arr.length; i++)
        arrResult.push(fn(arr[i]));

    return arrResult;
}

var ages = arrayCalc(years, calculateAge);
var fullAge = arrayCalc(ages, isFullAge);
var heartRates = arrayCalc(ages, maxHeartRate);


/* -------------------------------- */
/*   Functions returning functions  */
function interviewQuestions(job) {
    if (job == 'designer') {
        return function (name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    }
    else if (job == 'teacher') {
        return function (name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    }
    else return function (name) {
        console.log('Hello, ' + name + ', what do you do?')
    }
}

var teacherQuestions = interviewQuestions('teacher');
var designerQuestions = interviewQuestions('designer');

// teacherQuestions('John');
// designerQuestions('John');



/* ------------------------------------------- */
/*  Immediately invoked function expressions  */
/*  IIFE */

function game() {
    var score = Math.random() * 10;

    console.log(score >= 5);
}

// IIFE
// don't reusable code, but we can make hidden scope 
// from outside of the function
(function () {
    // don't have the acsess outside of this function
    var score = Math.random() * 10;

    // console.log(score >= 5);
})();



/* ------------------------------------------- */
/*  Closures  */
function retirement(rentirementAge) {
    var a = ' years left until retirement.';

    return function (yearOfBirth) {
        var age = 2016 - yearOfBirth;
        console.log((rentirementAge - age) + a);
    }
}

var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

// retirementUS(1990);
// retirementGermany(1990);
// retirementIceland(1990);

// Closures = we have an access to 'a' and 'rentirementAge' var 
// inside of an anonymous function
// even when 'rentirement' function is done.

function interviewQuestions(job) {

    return function (name) {
        if (job == 'designer') console.log(name + ', can you please explain what UX design is?');
        else if (job == 'teacher') console.log('What subject do you teach, ' + name + '?');
        else console.log('Hello, ' + name + ', what do you do?');
    }
}

// var teacherQuestions = interviewQuestions('teacher');
// var designerQuestions = interviewQuestions('designer');

// teacherQuestions('John');



/* ------------------------------------------- */
/*  Bind, Call, Apply  */

var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function (style, timeOfDay) {
        if (style === 'formal')
            console.log('Good ' + timeOfDay + ' ladies and gentelmen!'
                + ' I\'m ' + this.name
                + ', I\'m a ' + this.job
                + ', I\'m ' + this.age + ' years old');
        else
            console.log('Hey! What\'s up? '
                + ' I\'m ' + this.name
                + ', I\'m a ' + this.job
                + ', I\'m ' + this.age + ' years old.'
                + ' Have a nice ' + timeOfDay);
    }
}

var emely = {
    name: 'Emely',
    age: 35,
    job: 'designer'
};

// john.presentation('formal', 'morning');

// ------------
// call(this, param1, param2)
// john.presentation.call(emely, 'friendly', 'evening');


// ------------
// apply(this, [param1, param2])
// john.presentation.apply(emely, ['friendly', 'evening']);


// ------------
// bind
// preset some arguments
// var johnFriendly = john.presentation.bind(john, 'friendly');
// johnFriendly('evening');

// var emelyFormal = john.presentation.bind(emely, 'formal');
// emelyFormal('morning');




var years = [1990, 1965, 1937, 2005, 1998];

// callback function
function calculateAge(el) {
    return 2018 - el;
}

function isFullAge(limit, el) {
    return el >= limit ? true : false;
}

function arrayCalc(arr, fn) {
    var arrResult = [];

    for (var i = 0; i < arr.length; i++)
        arrResult.push(fn(arr[i]));

    return arrResult;
}

var ages = arrayCalc(years, calculateAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 12));



/* ------------------------------------------- */
/*  Challenge 4  */

function Question(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.corectAnswer = correctAnswer;
}

Question.prototype.displayQuestion = function () {
    console.log(this.question);

    for (var i in this.answers)
        console.log(i, ': ', this.answers[i]);
}

Question.prototype.checkAnswer = function (answer, callback) {
    var sc;

    if (answer === this.corectAnswer) {
        console.log('Correct answer!');
        sc = callback(true);
    }
    else {
        console.log('Wrong answer. Try again :)');
        sc = callback(false);
    }

    this.displayScore(sc);
}

Question.prototype.displayScore = function (userScore) {
    console.log('Current score is ', userScore);
    console.log('------------------------------');
}


function Interview() {
    this.questions = [];
}

Interview.prototype.createAQuestion = function (question, answers, correctAnswer) {
    this.questions.push(new Question(question, answers, correctAnswer));
}

Interview.prototype.userDialog = function () {
    var questions = this.questions;
    var keepScore = score();

    nextQuestion();

    function nextQuestion() {
        var randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        randomQuestion.displayQuestion();
    
        var userAnswer = prompt('Please select the correct answer');
    
        if (userAnswer !== 'exit') {
            randomQuestion.checkAnswer(parseInt(userAnswer), keepScore);
            nextQuestion();
        }
    }
}

function score () {
    var sc = 0;

    return function (isCorrect) {
        if(isCorrect) sc ++;

        return sc;
    }
}


var developerInterview = new Interview();

// New questions
developerInterview.createAQuestion('Is JavaScript the coolest programming language in the world?',
    ['Yes', 'No'],
    0);
developerInterview.createAQuestion('What is the name of this course\'s teacher?',
    ['John', 'Micheal', 'Jonas'],
    2);
developerInterview.createAQuestion('What does best describe coding?',
    ['Boring', 'Hard', 'Fun', 'Tediuos'],
    2);

developerInterview.userDialog();