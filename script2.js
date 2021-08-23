const menu = document.getElementById('valaszto');
const nav = document.getElementById('nav');

menu.addEventListener('click', function (event) {
    nav.classList.toggle('menu-active');            /*menüsáv elrejtése*/
    menu.classList.toggle('fi-align-justify');      /*kattintásra kicserélem a két ikont*/
    menu.classList.toggle('fi-arrow-left');
});

//Globális változók
let number1;
let number2;
let score = 0;
let scoreDiv2 = document.querySelector('#scoreDiv2');
init();

//Inicializálás
function init() {
    renderScore2();
}

//Renders
function renderScore2() {
    scoreDiv2.innerHTML = `Aktuális pontszám: ${score}`;
}


function renderQuestion2() {
    question2.innerHTML = `Mennyi ${number1} * ${number2} ?`;
}

function renderAlert2() {
    let alertValue2 = check2() ? `Helyesen válaszoltál, kapsz egy pontot! &#128578` : `Hibás válasz, levontunk egy pontot! &#128543`;
    alerts2.innerHTML = alertValue2;
}

function renderOther2() {
    start2.innerHTML = 'Új kérdés';
    send2.disabled = false;                  //a "Kész" gomb aktív
    result2.value = '';                      //input mező üres
    inputs2.classList.remove('hidden');
    removeAlerts2();
}

function removeAlerts2() {
    alerts2.innerHTML = '&#129488;';
}

//Handlers
//Véletlen számgenerátor 0 és 100, illetve 0 és 10 között
function generate1() {
    return Math.floor(Math.random() * 101);
}
function generate2() {
    return Math.floor(Math.random() * 11);
}

//Beállítom a számot a szorzáshoz
function getNumbers2() {
    number1 = generate1();
    number2 = generate2();
}

//Ellenőrzöm az eredményt
function check2() {
    let check = (result2.value == (number1 * number2)) ? true : false;
    return check  
}
//Beállítom a pontszámot
function setScore2() {
    check2() ? score++ : score--;
}

//Esemény kezelők
start2.addEventListener('click', () => {
    getNumbers2();
    renderQuestion2();
    renderOther2();
    result2.focus(); //kurzor az input mezőben
});

send2.addEventListener('click', () => {
    setScore2();
    renderScore2();
    renderAlert2();
    send2.disabled = true;
    result2.value = '';
});

result2.addEventListener('input', removeAlerts2)