'use strict'

// **** GLOBALS ****
let voteAmount = 25;
let itemArray = [];

// **** DOCUMENT WINDOWS ****
let imageContainer = document.getElementById('image-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('result-button');
let resultsList = document.getElementById('results-container');

// **** CONSTRUCTOR FUNCTIONS ****

function Item(name, imageExtension = 'jpg'){
    this.name = name;
    this.image = `img/${name}.${imageExtension}`;
    this.views = 0;
    this.votes = 0;

    itemArray.push(this);
}

// **** HELPER FUNCTIONS / UTILITIES ****

function rndmItemGen(){
  return Math.floor(Math.random() * itemArray.length);
}
function renderPoll(){
    let imgOneNdx = rndmItemGen();
    let imgTwoNdx = rndmItemGen();
    let imgThreeNdx = rndmItemGen();

    while(imgOneNdx === imgTwoNdx || imgOneNdx === imgTwoNdx || imgOneNdx === imgThreeNdx || imgTwoNdx === imgThreeNdx){
    imgTwoNdx = rndmItemGen();
    imgThreeNdx = rndmItemGen();
  }
    
    imgOne.src = itemArray[imgOneNdx].image;
    imgOne.title = itemArray[imgOneNdx].name;

    imgTwo.src = itemArray[imgTwoNdx].image;
    imgTwo.title = itemArray[imgTwoNdx].name;

    imgThree.src = itemArray[imgThreeNdx].image;
    imgThree.title = itemArray[imgThreeNdx].name;

    itemArray[imgOneNdx].views++;
    itemArray[imgTwoNdx].views++;
    itemArray[imgThreeNdx].views++;
}

// **** EVENT HANDLERS ****

function handleVoteClick(event){
    let imageClicked = event.target.title;

    for (let i = 0; i < itemArray.length; i++){
        if(imageClicked === itemArray[i].name){
            itemArray[i].votes++;
            voteAmount--;
            renderPoll();
        }
    }
    if (voteAmount === 0){
        imageContainer.removeEventListener('click', handleVoteClick);
    }
}

function handleShowResults(){
    
}

// **** EXECUTABLE CODE ****

let bag = new Item('bag');
let banana = new Item('banana');
let bathroom = new Item('bathroom');
let boots = new Item('boots');
let breakfast = new Item('breakfast');
let bubblegum = new Item('bubblegum');
let chair = new Item('chair');
let cthulhu = new Item('cthulhu');
let dogDuck = new Item('dog-duck');
let dragon = new Item('dragon');
let pen = new Item('pen');
let petSweep = new Item('pet-sweep');
let scissors = new Item('scissors');
let shark = new Item('shark');
let sweep = new Item('sweep', 'png');
let tauntaun = new Item('tauntaun');
let unicorn = new Item('unicorn');
let waterCan = new Item('water-can');
let wineGlass = new Item('wine-glass');

renderPoll();
console.dir(itemArray);

imageContainer.addEventListener('click', handleVoteClick);