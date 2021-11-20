// # Global Variables //
const billInput = document.getElementById('bill');
const tipOptions = document.getElementsByClassName('tip-options');
const tipInput = document.getElementById('custom-tip');
const peopleNumInput = document.getElementById('people-num');

const tipAmountText = document.getElementById('tip-amount');
const totalText = document.getElementById('total');

const resetButton = document.getElementById('reset-button');

let billPrevValue = '';
let tipPrevValue = '';
let peopleNumPrevValue = '';

const primaryColor = '#26c0ab';
const hoverColor = '#aae0d9';
const darkCyan = '#00494d';

const selectedTipBtnClass = 'active-tip-btn';

// # Functions //
// This is the function that verifies against regex
const checkAgainstRegex = (regex, str) => regex.test(str);

// Restrict what the user can input
const validateInput = (inputType, curValue, prevValue) => {
    let regex;

    if (inputType === 'integer') {
        regex = new RegExp('(^0$)|(^[1-9][0-9]*$)');
    }
    else if (inputType === 'float') {
        regex = new RegExp('(^0$)|(^0\\.([0-9]{1,2})?$)|(^[1-9][0-9]*$)|(^[1-9][0-9]*\\.([0-9]{1,2})?$)');
    }
    else {
        console.error("Unidentified input type");
    }

    if (!checkAgainstRegex(regex, curValue)) {
        
        if (curValue !== '00' && curValue.length === 2 && checkAgainstRegex(regex, curValue[1])) {
            /* This will change 0 to a number from 1 to 9 depending on what the user
            entered, this so the user won't need to remove the number 0 to write 
            another*/
            prevValue = curValue[1];
        }

        if (curValue !== '') {
            curValue = prevValue;
        }
    }

    return curValue;
}

// Check reset button state and updating the button
const resetBtnIsActive = () => {
    if (billPrevValue !== '' && tipPrevValue !== '' && peopleNumPrevValue !== '') {
        return true;
    }
    else {
        return false;
    }
}

const updateResetBtnState = () => {
    if (resetBtnIsActive() && resetButton.style.backgroundColor !== primaryColor) {
        resetButton.style.backgroundColor = primaryColor;
    }
}
// Display the results
const disaplyResults = () => {
    let tipAmountPP = 0;
    let totalPP = 0;

    if (resetBtnIsActive() && peopleNumPrevValue !== '0') {

        const bill = +billPrevValue;
        const tip = +tipPrevValue / 100;
        const peopleNum = +peopleNumPrevValue;
    
        tipAmountPP = +bill * +tip / +peopleNum;
        totalPP = +bill / +peopleNum + +tipAmountPP;
    }

    tipAmountText.innerHTML = '$' + tipAmountPP.toFixed(2).toString();
    totalText.innerHTML = '$' + totalPP.toFixed(2).toString();
}
// Disable all tip buttons
const setSelectedTipBtn = tipButton => {
    tipButton.style.cursor = 'default';
    tipButton.style.color = darkCyan;
    tipButton.style.backgroundColor = primaryColor;
}
const disableAllTipBtns = () => {
    for (const tipOp of tipOptions) {
        if (tipOp.classList.contains(selectedTipBtnClass)) {
            tipOp.classList.remove(selectedTipBtnClass);
            tipOp.style.color = 'white';
            tipOp.style.backgroundColor = darkCyan;
        }
    }
}

// # Dealing with events //
billInput.addEventListener('input', () => {
    billInput.value = validateInput('float', billInput.value, billPrevValue);
    billPrevValue = billInput.value;

    updateResetBtnState();
    disaplyResults();
});
// The tips
tipInput.addEventListener('input', () => {
    tipInput.value = validateInput('integer', tipInput.value, tipPrevValue);
    tipPrevValue = tipInput.value;

    updateResetBtnState();
    disaplyResults();
    disableAllTipBtns();
});
// All other tip options
for (const tipOption of tipOptions) {
    tipOption.addEventListener('mouseover', () => {
        if (!tipOption.classList.contains(selectedTipBtnClass)) {
            tipOption.style.cursor = 'pointer';
            tipOption.style.color = darkCyan;
            tipOption.style.backgroundColor = hoverColor;
        }
    });
    
    tipOption.addEventListener('mouseout', () => {
        if (!tipOption.classList.contains(selectedTipBtnClass)) {
            tipOption.style.color = 'white';
            tipOption.style.backgroundColor = darkCyan;
        }
    });

    tipOption.addEventListener('click', () => {
        tipPrevValue = tipOption.innerHTML.replace('%', '');
        tipInput.value = '';
        
        updateResetBtnState();
        disaplyResults();

        if (!tipOption.classList.contains(selectedTipBtnClass)) {
            disableAllTipBtns();
            setSelectedTipBtn(tipOption);
            tipOption.classList.add(selectedTipBtnClass);
        }
    });
}

peopleNumInput.addEventListener('input', () => {
    peopleNumInput.value = validateInput('integer', peopleNumInput.value, peopleNumPrevValue);
    peopleNumPrevValue = peopleNumInput.value;

    if (peopleNumInput.value === '0') {
        // Activate error message
    }

    updateResetBtnState();
    disaplyResults();
});
// The reset button
resetButton.addEventListener('mouseover', () => {
    if (!resetBtnIsActive()) {
        return;
    }

    resetButton.style.backgroundColor = hoverColor;
    resetButton.style.cursor = 'pointer';
});
resetButton.addEventListener('mouseout', () => {
    if (!resetBtnIsActive()) {
        return;
    }

    resetButton.style.backgroundColor = primaryColor;
});
resetButton.addEventListener('click', () => {
    if (!resetBtnIsActive()) {
        return;
    }

    billPrevValue = '';
    tipPrevValue = '';
    peopleNumPrevValue = '';

    billInput.value = '';
    tipInput.value = '';
    peopleNumInput.value = '';

    disaplyResults();
});