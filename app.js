// IIFE allows a data privacy

// BUDGET CONTROLLER
var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function () {
        if (data.total.inc > 0)
            this.percentage = Math.round((this.value * 100) / data.total.inc);
        else this.percentage = -1;
    }

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(element => {
            sum += element.value;
        });

        data.total[type] = sum;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            // create new ID
            if (data.allItems[type].length === 0) ID = 0;
            else ID = data.allItems[type][data.allItems[type].length - 1].id + 1;


            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp')
                newItem = new Expense(ID, des, val);
            else if (type === 'inc')
                newItem = new Income(ID, des, val);

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new Element
            return newItem;
        },

        deleteItem: function (id, type) {
            var ids, index;

            // map = return a new array
            // foreach doesn't return a new array
            ids = data.allItems[type].map(element => {
                return element.id;
            });

            index = ids.indexOf(id);

            if (index > -1)
                data.allItems[type].splice(index, 1);
        },

        calcBudget: function () {

            // calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            // calculate the budget: income - expenses
            data.budget = data.total.inc - data.total.exp;

            // calculate the percentage of income that we spent
            if (data.total.inc > 0)
                data.percentage = Math.round((data.total.exp * 100) / data.total.inc);
            else
                data.percentage = -1;

        },

        calcPercentages: function () {
            data.allItems.exp.forEach(element => {
                element.calcPercentage();
            });
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.total.inc,
                totalExp: data.total.exp,
                percentage: data.percentage
            };
        },

        getPercentages: function () {

            var percentages = data.allItems.exp.map(element => {
                return element.getPercentage();
            });

            return percentages;
        }
    };

})();


// UI CONTROLLER
var UIController = (function () {
    var DOMStrings = {
        month: '.budget__title--month',
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addButton: '.add__btn',
        container: '.container',
        incomeList: '.income__list',
        expensesList: '.expenses__list',
        expensePercentege: '.item__percentage',
        budget: '.budget__value',
        budgetIncome: '.budget__income--value',
        budgetExpenses: '.budget__expenses--value',
        budgetPercentage: '.budget__expenses--percentage'
    };

    formatNumber = function (num, type) {
        var numSplit, int, dec;

        // Exactly 2 decimal points
        num = Math.abs(num);
        num = num.toFixed(2);  // delete or add 2 decimals

        // Comma separeting the thousands
        numSplit = num.split('.');
        int = numSplit[0];
        dec = numSplit[1];

        if (int.length > 3)
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3);

        // Plus or minus before num
        type === 'exp' ? sign = '-' : sign = '+';

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },
        addListItem: function (obj, type) {
            var html, parent;
            // Create a HTML str with placeholder text
            if (type === 'inc') {
                html = '<div class="item clearfix" id="inc-%id%">'
                    + '<div class="item__description">%description%</div>'
                    + '<div class="right clearfix">'
                    + '<div class="item__value">%value%</div>'
                    + '<div class="item__delete">'
                    + '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'
                    + '</div></div></div>';

                parent = document.querySelector(DOMStrings.incomeList);
            }
            else if (type === 'exp') {
                html = '<div class="item clearfix" id="exp-%id%">'
                    + '<div class="item__description">%description%</div>'
                    + '<div class="right clearfix">'
                    + '<div class="item__value">%value%</div>'
                    + '<div class="item__percentage">21%</div>'
                    + '<div class="item__delete">'
                    + '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'
                    + '</div></div></div>';
                parent = document.querySelector(DOMStrings.expensesList);
            }

            // Replace the placeholder text with some actual data
            html = html.replace('%id%', obj.id);
            html = html.replace('%value%', formatNumber(obj.value, type));
            html = html.replace('%description%', obj.description);

            // Insert the HTML into the DOM                
            parent.insertAdjacentHTML('beforeend', html);
        },

        deleteListItem: function (itemID) {
            var element;

            element = document.getElementById(itemID);
            element.parentNode.removeChild(element);
        },

        clearFields: function () {
            var fields, fieldsArr;

            // return a List
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            // convert a List to Array
            fieldsArr = Array.prototype.slice.call(fields);

            // currentElement, index, array
            fieldsArr.forEach(element => {
                element.value = '';
            });

            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {

            document.querySelector(DOMStrings.budget).textContent
                = formatNumber(obj.budget, obj.budget > 0 ? 'inc' : 'exp');

            document.querySelector(DOMStrings.budgetIncome).textContent = formatNumber(obj.totalInc);
            document.querySelector(DOMStrings.budgetExpenses).textContent = formatNumber(obj.totalExp, 'exp');

            if (obj.percentage > 0)
                document.querySelector(DOMStrings.budgetPercentage).textContent = obj.percentage + '%';
            else
                document.querySelector(DOMStrings.budgetPercentage).textContent = '---';
        },

        displayPercentages: function (list) {

            document.querySelectorAll(DOMStrings.expensePercentege)
                .forEach((element, i) => {
                    if (list[i] > 0)
                        element.textContent = list[i] + '%';
                    else
                        element.textContent = '---';
                });
        },

        displayMonth: function () {
            var monthes, now;

            monthes = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

            var now = new Date();
            document.querySelector(DOMStrings.month).textContent
                = monthes[now.getMonth()] + ' ' + now.getFullYear();
        },

        changedType: function () {

            var fields = document.querySelectorAll(DOMStrings.inputType + ', '
                + DOMStrings.inputDescription + ', '
                + DOMStrings.inputValue);

            fields.forEach(element => {
                element.classList.toggle('red-focus');
            });

            document.querySelector(DOMStrings.addButton).classList.toggle('red');

        },

        getDOMStrings: function () {
            return DOMStrings;
        }
    };

})();


// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setUpEventListeners = function () {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.addButton).addEventListener('click', ctrAddItem);

        // User click Enter
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UIController.changedType);
    };

    var updateBudget = function () {
        var budget;

        // 1. Calc the budget
        budgetCtrl.calcBudget();

        // 2. Return the budget
        budget = budgetCtrl.getBudget();

        // 3. Display the budget on the UI 
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function () {

        // Calc percentages
        budgetCtrl.calcPercentages();

        // Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();

        // Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };

    var ctrAddItem = function () {
        var input, newItem;

        // Get the field input data
        input = UICtrl.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {

            // Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // Clear fields
            UICtrl.clearFields();

            // Calculate and update budget
            updateBudget();

            // Update percentages
            updatePercentages();
        }
    };

    var ctrDeleteItem = function (event) {
        var itemID, splitItemID, type, id;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitItemID = itemID.split('-');
            type = splitItemID[0];
            id = parseInt(splitItemID[1]);

            // Data: Delete item
            budgetCtrl.deleteItem(id, type);

            // UI: Delete item
            UICtrl.deleteListItem(itemID);

            // Calculate and update budget
            updateBudget();

            // Update percentages
            updatePercentages();
        }
    }

    return {
        init: function () {
            setUpEventListeners();
            UIController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            UIController.displayMonth();
        }
    }

})(budgetController, UIController);


controller.init();