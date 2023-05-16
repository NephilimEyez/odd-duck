'use strict'

// **** GLOBALS ****
let voteAmount = 25;
let itemArray = [];

const results = {
    allItemsArray: [],
    indexArray: [],
}

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
    while (results.indexArray.length < 6) {
        let randomNumber = rndmItemGen();
        if (!results.indexArray.includes(randomNumber)) {
            results.indexArray.push(randomNumber);
        }
    }
    let imgOneNdx = results.indexArray.shift();
    let imgTwoNdx = results.indexArray.shift();
    let imgThreeNdx = results.indexArray.shift();
    
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
    if(voteAmount === 0){
        for(let i = 0; i < itemArray.length; i++){
            let heroImageRow = document.createElement('tr');
            heroImageRow.innerHTML = `<img src="${itemArray[i].image}">`;
            resultsList.appendChild(heroImageRow);

            let votesRow = document.createElement('tr');
            heroImageRow.appendChild(votesRow);

            let votesHeader = document.createElement('td');
            votesHeader.innerText = `Votes: ${itemArray[i].votes}`
            votesRow.appendChild(votesHeader);

            let viewsHeader = document.createElement('td');
            viewsHeader.innerText = `Views: ${itemArray[i].views}`
            votesRow.appendChild(viewsHeader);

            let voteViewsHeader = document.createElement('td');
            let percentage = Math.floor((itemArray[i].votes/itemArray[i].views)*100);
            voteViewsHeader.innerText = `Votes/Views Percent: ${percentage};`
            votesRow.appendChild(voteViewsHeader);
        }
    }
}

function renderChart() {
    
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

imageContainer.addEventListener('click', handleVoteClick);
resultsBtn.addEventListener('click', handleShowResults);