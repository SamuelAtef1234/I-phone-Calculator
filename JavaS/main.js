let showRes = document.querySelector(".show-res");
let dltBtn = document.getElementById("dlt-back");
let dltAll = document.getElementById("dlt-all");
let numberBtns = document.querySelectorAll(".number");
let operator = document.querySelectorAll(".operator");
let porm = document.getElementById('porm');
let otherOperators = document.querySelector('.other-operators');
let nPow2 = document.getElementById('n-pow-2');
let nPown = document.getElementById('n-pow-n');
let sqrt = document.getElementById('sqrt');
let log = document.getElementById('log');
let equal = document.getElementById('equal');
let minus = document.getElementById('minus');
let allButtons = document.querySelectorAll('button');

let cur;
let curOp;
let checkEqual = 0;
let checknPown = 0;
let checkMinus = 0;

dltBtn.addEventListener('click', () => {
    if(showRes.innerHTML !== '0' || showRes.innerHTML !== ''){
        let x = showRes.innerHTML;
        x = x.substring(0,x.length - 1);
        showRes.innerHTML = x;
    }
})  

dltAll.addEventListener('click', () => {
    showRes.innerHTML = '0';
})

minus.onclick = function(){
    showRes.innerHTML = '-';
    checkMinus = 1;
}

numberBtns.forEach(element => {
    element.addEventListener('click', () => {
        if(checkEqual){
            showRes.innerHTML = element.innerHTML;
            checkEqual = 0;
        }else if(checkMinus){
            showRes.innerHTML += element.innerHTML;
            checkMinus = 0;
        }
        else if(showRes.innerHTML[0] == '0' || showRes.innerHTML === 'x' || showRes.innerHTML === '÷' || showRes.innerHTML === '+' || showRes.innerHTML === '−'){
            showRes.innerHTML = '';
            showRes.innerHTML += element.innerHTML;
        }else if(checknPown){
            showRes.innerHTML = `${cur}<sup>${element.innerHTML}</sup>`;
        }
        else{
            if(element.innerHTML === '.' && showRes.innerHTML.includes('.'))
                return;
            else
                showRes.innerHTML += element.innerHTML;
        }
    })
});

operator.forEach((op) => {
    op.addEventListener('click', () => {
        cur = showRes.innerHTML;
        showRes.innerHTML = op.innerHTML;
        curOp = changeOP(op.innerHTML);
    })
})

function changeOP(op) {
    switch (op) {
        case '÷':
        case '&div;':
            return '/';
        case '×':
        case 'x':
        case '*':
            return '*';
        case '−':
        case '-':
        case '&minus;':
            return '-';
        case '+':
        case '&plus;':
            return '+';
        default:
            return op;
    }
}

nPow2.addEventListener('click', () => {
    cur = showRes.innerHTML;
    showRes.innerHTML = `${cur}<sup>2</sup>`;
    curOp = '1';
})

nPown.addEventListener('click', () => {
    cur = showRes.innerHTML;
    showRes.innerHTML = `${cur}<sup>n</sup>`;
    curOp = '2';
    checknPown = 1;
})

sqrt.addEventListener('click', () => {
    cur = showRes.innerHTML;
    showRes.innerHTML = `√ ${cur}`;
    curOp = '3';
})

log.addEventListener('click', () => {
    cur = showRes.innerHTML;
    showRes.innerHTML = `log ${cur}`;
    curOp = '4';
})

porm.addEventListener('click', () => {
    if(otherOperators.style.display == 'none'){
        otherOperators.style.display = "flex";
        allButtons.forEach((but) => {
            but.style.width = "60px";
            but.style.height = "60px";
        })
    }else{
        otherOperators.style.display = "none";
        allButtons.forEach((but) => {
            but.style.width = "75px";
            but.style.height = "75px";
        })
    }
})

equal.addEventListener('click', () => {
    showRes.innerHTML = showResult(+cur, curOp, +showRes.innerHTML);
    checkEqual = 1;
    checknPown = 0;
})

function showResult(c, co, n = 1){
    if(co === '-'){
        return c-n;
    }else if(co === '+'){
        return c+n;
    }else if(co === '*'){
        return c*n;
    }else if(co === '/'){
        return c/n;
    }else if(co == '1'){
        return Math.pow(c, 2);
    }else if(co == '2'){
        let cs = showRes.textContent;
        return Math.pow(c, cs[cs.length - 1]);
    }else if(co == '3'){
        return Math.sqrt(c);
    }else if(co == '4'){
        return Math.log10(c).toFixed(3);
    }
    else{
        return 0;
    }
}