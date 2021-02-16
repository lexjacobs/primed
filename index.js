const cowsay = require('cowsay');
const { rword } = require('rword');
const keypress = require('keypress');

function startKeypress() {
  // make `process.stdin` begin emitting "keypress" events
  keypress(process.stdin);
  // listen for the "keypress" event
  process.stdin.on('keypress', function (ch, key) {
    if (key && key.name == 'space') {
      var next = queue.shift();
      if(next){
        next();
      }
    }
    if (key && key.ctrl && key.name == 'c') {
      process.exit();
    }
  });
  if (process.stdin.setRawMode) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();
}
startKeypress();

function clearScreen() {
  const readline = require('readline');
  const blank = '\n'.repeat(process.stdout.rows);
  console.log(blank);
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}

function wordWith(let) {
  var re = new RegExp(`^${let}`);
  return rword.generate(1, { contains: re, capitalize: 'first' } );
}

function makeCombo() {
  return `${wordWith('r')} ${wordWith('p')} ${wordWith('t')} 23`;
}

var makeCombos;

function final1() {
  clearScreen();
  clearInterval(makeCombos);
  console.log('FINAL ANSWER: ');
  console.log(cowsay.say({ text: 'prime', e: 'x0' }));
}
function final2() {
  clearScreen();
  console.log('FINAL ANSWER: ');
  console.log(cowsay.say({ text: 'prime prime', e: '0x' }));
}

function final3() {
  clearScreen();
  console.log('FINAL ANSWER: ');
  console.log(cowsay.say({ text: 'prime prime prime', e: 'xx' }));
}

var printCombos = function(){
  makeCombos = setInterval(() => {
    console.log(makeCombo());
  }, 500);
};

var queue = [final1, final2, final3];
printCombos();
