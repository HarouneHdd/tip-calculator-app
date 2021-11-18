const billInput = document.getElementById('bill');
const tipOptions = document.getElementsByClassName('tip-options');
const tipInput = document.getElementById('custom-tip');
const peopleNumInput = document.getElementById('people-num');

const tipAmountText = document.getElementById('tip-amount');
const totalText = document.getElementById('total');

const resetButton = document.getElementById('reset-button');

let billValue = '';
let tipValue = '';
let peopleNumValue = '';

// This is the function that verifies against regex
const checkAgainstRegex = (regex, str) => regex.test(str);

billInput.addEventListener('input', () => {
    const regex = new RegExp('(^[1-9][0-9]*$)|(^[1-9][0-9]*\.([0-9]{1,2})?$)');
    const value = billInput.value;

    if (checkAgainstRegex(regex, value)) {
        billValue = value;
    }
    else {
        if (value === '') {
            billValue = '';
        }

        billInput.value = billValue;
    }
});

 // ---------------------------------------------------------- //
/* I want to create one function that will validate the inputs
   check for float and interger numbers */
// ---------------------------------------------------------- //

/* tipInput.addEventListener('input', () => {
    const regex = new RegExp('(^0$)|(^[1-9][0-9]*$)');
    const value = tipInput.value;

    if (checkRegex(regex, value)) {
        tipValue = value;
    }
    else {
        if (value === '') {
            tipValue = '';
        }
        else if (value !== '00' && value.length === 2 && checkRegex(regex, value[1])) {
            // This will change 0 to a number from 1 to 9 depending on what the user
            // entered, this so the user won't need to remove the number 0 to write 
            // another
            peopleNumValue = value[1];
        }

        peopleNumInput.value = peopleNumValue;
    } 
});*/

peopleNumInput.addEventListener('input', () => {
    const regex = new RegExp('(^0$)|(^[1-9][0-9]*$)');
    const value = peopleNumInput.value;

    if (checkAgainstRegex(regex, value)) {
        peopleNumValue = value;
    }
    else {
        if (value === '') {
            peopleNumValue = '';
        }
        else if (value !== '00' && value.length === 2 && checkAgainstRegex(regex, value[1])) {
            /* This will change 0 to a number from 1 to 9 depending on what the user
            entered, this so the user won't need to remove the number 0 to write 
            another*/
            peopleNumValue = value[1];
        }

        peopleNumInput.value = peopleNumValue;
    }
});