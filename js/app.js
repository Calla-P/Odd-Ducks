'use strict';
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:last-child');

let resultsButton = document.getElementById('results');


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

// Question: Where in the code do I want to load my odds array?
// Load from LS
if (localStorage.getItem('savedOdds')) {
  // Step 3.
  let savedOdds = localStorage.getItem('savedOdds');
  // Step 4.
  odds = JSON.parse(savedOdds);
}

// Question: Where in the code do I want to load my odds views?
// Load from LS
if (localStorage.getItem('savedViews')) {
  // Step 3.
  let savedViews = localStorage.getItem('savedViews');
  // Step 4.
  odds = JSON.parse(savedViews);
}
// Questions: how do I track the clicks with local storage?
// How do I get the site to reload without breaking and refresh while keeping up with the incrementing clicks for the proper results?


let uniqueOdds = [];

let firstOdd;
let secondOdd;
let thirdOdd;

// getting products at random

function getRandomIndex() {
  return Math.floor(Math.random() * odds.length);
}


// assigning my images

function renderOdds() {

  while (uniqueOdds.length < 6) {
    let randomIndex = getRandomIndex();
    if (!uniqueOdds.includes(odds[randomIndex])) {
      uniqueOdds.push(odds[randomIndex]);
    }
  }
  console.log(uniqueOdds);

  firstOdd = uniqueOdds[0];
  secondOdd = uniqueOdds[1];
  thirdOdd = uniqueOdds[2];

  image1.src = firstOdd.src;
  image1.alt = firstOdd.name;
  image1.title = firstOdd.name;
  image2.src = secondOdd.src;
  image2.alt = secondOdd.name;
  image2.title = secondOdd.name;
  image3.src = thirdOdd.src;
  image3.alt = thirdOdd.name;
  image3.title = thirdOdd.name;

  firstOdd.views++;
  secondOdd.views++;
  thirdOdd.views++;

  // Question: Where in the code do I want to save my views?
  // every time a odd is viewed, I want to save the odd views to LS
  // Step 1.
  let stringify = JSON.stringify(firstOdd.views++, secondOdd.views++, thirdOdd.views++);
  // Step 2.
  localStorage.setItem('savedViews', stringify);

  uniqueOdds.shift();
  uniqueOdds.shift();
  uniqueOdds.shift();

}


renderOdds();


function handleOddClick(event) {
  clicks++;
  console.log(event.target);

  // Question: Where in the code do I want to save my odds array?
  // every time a odd is clicked, I want to save the odds array to LS
  // Step 1.
  let stringify = JSON.stringify(odds);
  // Step 2.
  localStorage.setItem('savedOdds', stringify);



  // increment the correct odd's .clicks?

  for (let i = 0; i < odds.length; i++) {
    if (odds[i].name === event.target.alt) {
      odds[i].clicks++;
    }
  }

  if (clicks > 24) {
    // remove the event listeners
    image1.removeEventListener('click', handleOddClick);
    image2.removeEventListener('click', handleOddClick);
    image3.removeEventListener('click', handleOddClick);
  }
  console.log(odds);
  renderOdds();
}


function viewResults(event) {
  let ul = document.querySelector('ul');

  for (let i = 0; i < odds.length; i++) {
    let li = document.createElement('li');
    li.innerText = `${odds[i].name} was viewed ${odds[i].views} times, and was clicked ${odds[i].clicks} times.`;
    ul.appendChild(li);
  }

  // get my names into an array with a for loop:
  let oddNames = [];
  for (let i = 0; i < odds.length; i++) {
    oddNames.push(odds[i].name);
  }
  console.log('the oddNames are:', oddNames);

  // get my click data into an array with a for loop:
  let oddClicks = [];
  for (let i = 0; i < odds.length; i++) {
    oddClicks.push(odds[i].clicks);
  }
  console.log('the oddClicks are:', oddClicks);

  // get my view data into an array with a for loop:

  let oddViews = [];
  for (let i = 0; i < odds.length; i++) {
    oddViews.push(odds[i].views);
  }
  console.log('the oddViews are:', oddViews);



  const ctx = document.getElementById('myChart');

  // the starter code for this Chart comes from chartjs.org's "Getting Started"
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: oddNames, // x-axis
      datasets: [{
        label: '# of Clicks Per Odd Image', // title
        data: oddClicks, // y-axis data
        borderColor: [],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderWidth: 1
      }, {
        label: '# of Views Per Odd Image',
        data: oddViews,
        borderColor: [], // Utils.CHART_COLORS.blue,
        borderWidth: 1 //Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });




  resultsButton.removeEventListener('click', viewResults);
}
// page loaders

image1.addEventListener('click', handleOddClick);
image2.addEventListener('click', handleOddClick);
image3.addEventListener('click', handleOddClick);
resultsButton.addEventListener('click', viewResults);