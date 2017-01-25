var afinn;
var socket;


var letter;
var typing = '';
var input = '';
var avg = '';
var word = [];
var words = [];
var x = '';
var average = 0;
var ts = [];


var scoredWords = [];
var totalScore = 0;

function preload() {
  afinn = loadJSON('AFINN.json');
}

function setup() {
  createCanvas(720, 500);
  background(255);
  socket = io.connect('http://localhost:3000');
  socket.on('type', draw);
}

function draw(data) {
  background(255);
  fill(0);
  textSize(15);
  text(totalScore, 50, 450);
  text(totalScore / average.length, 50, 475);


  textSize(14 + ((totalScore / average.length)) * 5);
  if (keyCode !== RETURN) {
    text(typing, 50, 120, 540, 300);
    text(data.b, 50, 220, 540, 300);

  }
}

// function player2(data) {
//   loop();
//   fill(0, 0, 255);
//   textSize(10);
//   text(data.k, 50, 450);
//   text(data.k / (data.d).length, 50, 475);


//   textSize(14 + ((data.k / (data.d).length)) * 25);
//   if (keyCode !== RETURN) {
//     text(data.b, 50, 120, 540, 300);
//   }
// }

function keyReleased() {
   console.log('Sending: ' + typing + avg + totalScore);

    var data = {
      a: letter,
      b: typing,
      c: input,
      d: avg,
      e: word,
      f: words,
      g: x,
      h: average,
      j: ts,
      k: totalScore
    }

    socket.emit('type', data);
}

function keyTyped() {
  if ((key >= 'A' && key <= 'z') || key == ' ' || key == '.' ||
    key == '!' || key == '?' || key == ',') {
    letter = key;
    typing = typing + key;
    input = input + key;
    avg = avg + key;
  }
}

function keyPressed() {

  if (key == ' ' || key == '.' || key == '!' || key == '?' || key == ',') {
    word = input;
    input = "";
    words = word.split(/\W/);

    x = avg;
    average = x.split(/\W/);


    for (var i = 0; i < words.length; i++) {
      var compare = words[i].toLowerCase();
      if (afinn.hasOwnProperty(compare)) {

        var score = afinn[compare];
        totalScore += Number(score);
        scoredWords.push(word + ':' + score + ' ');
        ts = ((totalScore / average.length) * 20);
      }
    }
  }

  if (keyCode == BACKSPACE) {
    typing = typing.substring(0, typing.length - 1);
  }


  if (keyCode == ENTER) {
    canvas.clear;

    print(average.length);
    r = average.length;
    print(random(average));
    textSize(random(100, 500));
    fill(random(255), random(255), random(255), 20);
    textAlign(LEFT);

    text(totalScore, 100, 450);


    saveCanvas('images/myCanvas', 'jpg');
    canvas.remove();
  }
}