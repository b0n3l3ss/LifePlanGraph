import Plotly from 'plotly.js-dist';

//Display Elements for index1
const lifeGraph = document.getElementById("lifeMapGraph");
const headLine = document.getElementById("graphHeadline");

//Retrieving Root data for graph
let rootName = localStorage.getItem("rootName");
let rootYoB = Number(localStorage.getItem("rootYoB"));
let numAddPpl = Number(localStorage.getItem("numPeople"));
let numEvents = Number(localStorage.getItem("numLifeEvents"));


//Button
let invButton = document.getElementById("invertButton");

//Flags
let isInverted = false;

console.log(rootName);
console.log(rootYoB);


var normalData = [];
var invertedData = [];

function retrieveDataFromStorage() {
    // This loop creates the data array for both normal and inverted graph lives.
    for(let i = 0; i < numAddPpl; i++) {
        let age = Number(localStorage.getItem(`${i}Age`));

        // Normal Data
        var added = {
            x: [age, age + 100],
            y: [0,100],
            type: 'scatter',
            text:[localStorage.getItem(`${i}Name`), localStorage.getItem(`${i}Name`)],
            textposition: 'top center',
            name: localStorage.getItem(`${i}Name`),
            line: {
                width: 4
            }
        };
        normalData.push(added);

        // Inverted Data
        var added = {
            y: [age, age + 100],
            x: [0,100],
            type: 'scatter',
            text:[localStorage.getItem(`${i}Name`), localStorage.getItem(`${i}Name`)],
            textposition: 'top center',
            name: localStorage.getItem(`${i}Name`),
            line: {
                width: 4
            }
        };
        invertedData.push(added);
    }

    // This loop creates the data array for both nomral and inverted graph events.
    for(let i = 0; i < numEvents; i++) {
        let age = Number(localStorage.getItem(`${i}eventAge`));
        
        // Normal Data
        var added = {
            x: [0, rootYoB + age, 3000],
            y: [age, age, age],
            type: 'scatter',
            text:[localStorage.getItem(`${i}eventName`), localStorage.getItem(`${i}eventName`)],
            line: {
                dash: 'dot',
                width: 4
            },
            name: localStorage.getItem(`${i}eventName`)
        };
        normalData.push(added);

        // Inverted Data
        var added = {
            y: [0, rootYoB + age, 3000],
            x: [age, age, age],
            type: 'scatter',
            text:[localStorage.getItem(`${i}eventName`), localStorage.getItem(`${i}eventName`)],
            line: {
                dash: 'dot',
                width: 4
            },
            name: localStorage.getItem(`${i}eventName`)
        };
        invertedData.push(added);
    }
}

document.addEventListener('DOMContentLoaded', function() {

    //The two different graph layouts for 
    var normalLayout = {
        xaxis: {
            title: "Year",
            range: [rootYoB, rootYoB + 100],
            ticks: 'outside',
            tick0: rootYoB,
            dtick: 10,
            ticklen: 0,
            tickcolor: '#000'

        },
        yaxis: {
            title: "Age",
            range: [0,100],
            ticks: 'outside',
            tick0: 0,
            dtick: 10,
            ticklen: 0,
            tickcolor: '#000'
        },
        //legend: {
        //    x: -5,
        //    y: .27
        //}
    };

    var invertedLayout = {
        yaxis: {
            title: "Year",
            range: [rootYoB, rootYoB + 100],
            ticks: 'outside',
            tick0: rootYoB,
            dtick: 10,
            ticklen: 0,
            tickcolor: '#000'

        },
        xaxis: {
            title: "Age",
            range: [0,100],
            ticks: 'outside',
            tick0: 0,
            dtick: 10,
            ticklen: 0,
            tickcolor: '#000'
        }
    };
    
    //The two different root data points. Used for the different maps.
    var normalRoot = {
        x: [rootYoB, rootYoB + 100],
        y: [0, 100],
        type: 'scatter',
        //mode: 'lines+text',
        text: [localStorage.getItem('rootName'), localStorage.getItem('rootName')],
        name: localStorage.getItem('rootName'),
        line: {
            width: 4
        }
    };

    var invertedRoot = {
        y: [rootYoB, rootYoB + 100],
        x: [0, 100],
        type: 'scatter',
        text: [localStorage.getItem('rootName'), localStorage.getItem('rootName')],
        name: localStorage.getItem('rootName'),
        line: {
            width: 4
        }
    }

    //Creates the two different arrays for graphing the map.
    normalData.push(normalRoot);
    invertedData.push(invertedRoot);
    retrieveDataFromStorage();
  
    const chartGraph = document.getElementById('lifeMapGraph');
    Plotly.newPlot(lifeGraph, normalData, normalLayout);


    //Button handler that inverts the data given.
    invButton.addEventListener('click', function() {
        if (isInverted) {
            Plotly.newPlot(lifeGraph, normalData, normalLayout);
            isInverted = false;
            headLine.innerHTML = "Life Time Map";
        } else {
            Plotly.newPlot(lifeGraph, invertedData, invertedLayout);
            isInverted = true;
            headLine.innerHTML = "Inverted Life Time Map";
        }
    });

    if (chartGraph) {
        console.log('lifeMapGraph is defined and found in the HTML.');
    } else {
        console.log('lifeMapGraph is NOT found in the HTML.');
    }
});