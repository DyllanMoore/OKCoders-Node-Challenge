const fetch = require('node-fetch');
fetch('https://dummyapi.io/data/v1/post?limit=1000', {
    headers: {
        'app-id': '627fd9d2eb72ad45b90b9e2f'
    }
})
    .then((response) => response.json())
    .then((data) => test(data)
    );

function test(data) {
    getMostPostedDay(data);
    getMostPostedAuthor(data);
}

function getMostPostedDay(data) {
    var posts = data.data;
    const dateArray = [];
    posts.forEach(element => {
        dateArray.push(element.publishDate.slice(0, 10));
    });
    if(dateArray.length == 0)
        return null;
    const dateFrequencies = {};
    var dateMaxElement = dateArray[0];
    var dateMaxCount = 1;
    for(var i = 0; i < dateArray.length; i++) {
        var dateElement = dateArray[i];
        if(dateFrequencies[dateElement] == null)
            dateFrequencies[dateElement] = 1;
        else
            dateFrequencies[dateElement]++;
        if(dateFrequencies[dateElement] > dateMaxCount) {
            dateMaxElement = dateElement;
            dateMaxCount = dateFrequencies[dateElement];
        }
    }
    console.log(`The date with the most posts was ${dateMaxElement}. There were ${dateMaxCount} posts that day.`);
};


function getMostPostedAuthor(data) {
    var posts = data.data;
    const authorArray = [];
    posts.forEach(element => {
        authorArray.push(`${element.owner.title} ${element.owner.firstName} ${element.owner.lastName}`);
    });    
    if (authorArray.length == 0)
        return null;
    const authorFrequencies = {};
    var authorMaxElement = authorArray[0];
    var authorMaxCount = 1;
    for(var i = 0; i < authorArray.length; i++) {
        var authorElement = authorArray[i];
        if(authorFrequencies[authorElement] == null)
            authorFrequencies[authorElement] = 1;
        else
            authorFrequencies[authorElement]++;
        if(authorFrequencies[authorElement] > authorMaxCount) {
            authorMaxElement = authorElement;
            authorMaxCount = authorFrequencies[authorElement];
        }
    }
    console.log(`The person with the most posts was ${authorMaxElement} with ${authorMaxCount} posts!`)
};

