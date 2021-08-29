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
let operator;
let scoreDiv = document.querySelector('#scoreDiv');
init();

//Inicializálás
function init() {
    renderScore();
}

//Renders, megjelenítések
function renderScore() {
    scoreDiv.innerHTML = `Aktuális pontszám: ${score}`;
}

function renderQuestion() {
    question.innerHTML = `Mennyi ${number1} ${operator} ${number2} ?`;
}

function renderAlert() {
    let alertValue = check() ? `Helyesen válaszoltál, kapsz egy pontot! &#128578` : `Hibás válasz, levontunk egy pontot! &#128543`;
    alerts.innerHTML = alertValue;
}

function renderOther() {
    start.innerHTML = 'Új kérdés';
    send.disabled = false;                  //a "Kész" gomb aktív
    result.value = '';                      //input mező üres
    inputs.classList.remove('hidden');
    removeAlerts();
}

function removeAlerts() {
    alerts.innerHTML = '&#129488;';
}

//Handlers
//Véletlen számgenerátor 0 és 100 között
function generate() {
    return Math.floor(Math.random() * 101);
}
// Műveletijel generátor
function operating() {
    let rnd = Math.floor(Math.random() * 2);
    return rnd;

}
//Beállítom a műveleti jelet
function setOperate() {
    operating() > 0 ? operator = '+' : operator = '-';
}
//Beállítom a számot
function getNumbers() {
    number1 = generate();
    number2 = generate();
}
//Ellenőrzöm az eredményt
function check() {
    let checked;
    if (operator === '+') {
        checked = (result.value == (number1 + number2)) ? true : false;
    } else {
        checked = (result.value == (number1 - number2)) ? true : false;
    }
    return checked;
}
//Beállítom a pontszámot
function setScore() {
    check() ? score++ : score--;
}
//Ha nyer akkor indul az animáció
function setWin() {
    score > 4 ? win.innerHTML = `<img src="children.jpg" width="300" height="200">` : win.innerHTML = "";
}
//Minden beállított eseményre meghívom az eseménykezelőt
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
};
//Reguláris kifejezésekkel szűröm a beírható karaktereket, maximum 3 karakter hossz
setInputFilter(document.getElementById('result'), function (value) {
    return /^-?\d{0,3}$/.test(value);
});
  
//Esemény kezelők
start.addEventListener('click', () => {
    getNumbers();
    setOperate();
    renderQuestion();
    renderOther();
    result.focus(); //kurzor az input mezőben
});
send.addEventListener('click', () => {
    setScore();
    renderScore();
    renderAlert();
    send.disabled = true;
    result.value = '';
    setWin();
});
result.addEventListener('input', removeAlerts);
