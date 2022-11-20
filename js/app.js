'use strict';
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:last-child');

let resultsButton = document.getElementById('results');
let index1 = 0;
let index2 = 0;
let index3 = 0;
let clicks = 0;


function Odd(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
}

let odd1 = new Odd('bag', './images/bag.jpeg');
let odd2 = new Odd('banana', './images/banana.jpeg');
let odd3 = new Odd('bathroom', './images/bathroom.jpeg');
let odd4 = new Odd('boots', './images/boots.jpeg');
let odd5 = new Odd('breakfast', './images/breakfast.jpeg');
let odd6 = new Odd('bubblegum', './images/bubblegum.jpeg');
let odd7 = new Odd('chair', './images/chair.jpeg');
let odd8 = new Odd('cthulhu', './images/cthulhu.jpeg');
let odd9 = new Odd('dog-duck', './images/dog-duck.jpeg');
let odd10 = new Odd('dragon', './images/dragon.jpeg');
let odd11 = new Odd('pen', './images/pen.jpeg');
let odd12 = new Odd('pet-sweep', './images/pet-sweep.jpeg');
let odd13 = new Odd('scissors', './images/scissors.jpeg');
let odd14 = new Odd('shark', './images/shark.jpeg');
let odd15 = new Odd('sweep', './images/sweep.png');
let odd16 = new Odd('tauntaun', './images/tauntaun.jpeg');
let odd17 = new Odd('unicorn', './images/unicorn.jpeg');
let odd18 = new Odd('water-can', './images/water-can.jpeg');
let odd19 = new Odd('wine-glass', './images/wine-glass.jpeg');


let odds = [odd1, odd2, odd3, odd4, odd5, odd6, odd7, odd8, odd9, odd10, odd11, odd12, odd13, odd14, odd15, odd16, odd17, odd18, odd19];


function getRandomIndex() {
  return Math.floor(Math.random() * odds.length);
}


function renderOdds() {
  index1 = getRandomIndex();
  index2 = getRandomIndex();
  index3 = getRandomIndex();
}

// we only move on, once firstOdd, secondOdd, thirdOdd are DIFFERENT

// How do i include the third picture to not be the same as the two before it? How do i get my first image to change?

while (index1 === index2 ) {
//   index1 = getRandomIndex();
  index2 = getRandomIndex();
  index3 = getRandomIndex();
}


let firstOdd = odds[index1];
let secondOdd = odds[index2];
let thirdOdd = odds[index3];


image1.src = firstOdd.src;
image1.alt = firstOdd.name;
image1.title = firstOdd.name;
image1.id = index1;
image2.src = secondOdd.src;
image2.alt = secondOdd.name;
image2.title = secondOdd.name;
image2.id = index2;
image3.src = thirdOdd.src;
image3.alt = thirdOdd.name;
image3.title = thirdOdd.name;
image3.id = index3;

firstOdd.views++;
secondOdd.views++;
thirdOdd.views++;

function handleOddClick(event) {
  clicks++;
  console.log(event.target);


  // increment the correct goat's .clicks?
  odds[event.target.id].clicks++;

  if (clicks > 24) {
    // remove the event listeners
    image1.removeEventListener('click', handleOddClick);
    image2.removeEventListener('click', handleOddClick);
    image3.removeEventListener('click', handleOddClick);
  }
  console.log(odds);
  renderOdds();
}

// eslint-disable-next-line no-unused-vars
function viewResults(_event) {
  let ul = document.querySelector('ul');
  // make one li for each goat inside goats
  for (let i = 0; i < odds.length; i++) {
    let li = document.createElement('li');
    li.innerText = `${odds[i].name} was viewed ${odds[i].views} times, and was clicked ${odds[i].clicks} times.`;
    ul.appendChild(li);
  }

  resultsButton.removeEventListener('click', viewResults);
}
// page loaders

image1.addEventListener('click', handleOddClick);
image2.addEventListener('click', handleOddClick);
image3.addEventListener('click', handleOddClick);
resultsButton.addEventListener('click', viewResults);
renderOdds();
