'use strict'

// **** GLOBALS ****
let voteAmount = 25;
let itemArray = [];
let indexArray = [];

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
}

// **** HELPER FUNCTIONS / UTILITIES ****

function rndmItemGen(){
  return Math.floor(Math.random() * itemArray.length);
}

function renderPoll(){
    while (indexArray.length < 6) {
        let randomNumber = rndmItemGen();
        if (!indexArray.includes(randomNumber)) {
            indexArray.push(randomNumber);
        }
    }
    let imgOneNdx = indexArray.shift();
    let imgTwoNdx = indexArray.shift();
    let imgThreeNdx = indexArray.shift();
    
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

function renderGraph() {
    let itemNames = [];
    let itemVotes = [];
    let itemViews = [];
    
    for (let i = 0; i < itemArray.length; i++) {
        itemNames.push(itemArray[i].name);
        itemVotes.push(itemArray[i].votes);
        itemViews.push(itemArray[i].views);
    }
    const data = {
        labels: itemNames,
        datasets: [{
            label: 'Votes',
            data: itemVotes,
            backgroundColor: 'rgba(255, 0, 0, 0.4)',
            borderColor: 'rgba(255, 0, 0, 0.8)',
            borderWidth: 1
        },
        {
            label: 'Views',
            data: itemViews,
            backgroundColor: 'rgba(0, 0, 255, 0.4)',
            borderColor: 'rgba(0, 0, 255, 0.8)',
            borderWidth: 1
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };
    const ctx = document.getElementById('graph-container');
    const myGraph = new Chart(ctx, config);
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

        let stringItems = JSON.stringify(itemArray);
        localStorage.setItem('myItems', stringItems);
    }
}

function handleShowResults(){
    if(voteAmount === 0){
        renderGraph();
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
            voteViewsHeader.innerText = `Votes/Views Percent: ${percentage}`;
            votesRow.appendChild(voteViewsHeader);
        }
    }
}

function renderChart() {
    
}

// **** EXECUTABLE CODE ****

let retrievedItems = localStorage.getItem('myItems');
let parsedItems = JSON.parse(retrievedItems);

if(retrievedItems){
    for(let i= 0; i < parsedItems.length; i++) {
        if(parsedItems[i].name === 'sweep') {
            let reconstructOdd = new Item(parsedItems[i].name, 'png');
            reconstructOdd.views = parsedItems[i].views;
            reconstructOdd.votes = parsedItems[i].votes;
            itemArray.push(reconstructOdd);
        } else {
            let reconstruct = new Item(parsedItems[i].name);
            reconstruct.views = parsedItems[i].views;
            reconstruct.votes = parsedItems[i].votes;
            itemArray.push(reconstruct);
        }
    }
} else {
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

    itemArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);
}

renderPoll();

imageContainer.addEventListener('click', handleVoteClick);
resultsBtn.addEventListener('click', handleShowResults);