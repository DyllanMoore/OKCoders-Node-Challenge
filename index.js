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
    getMostLikedPost(data);
    getMostUsedTags(data);
}

function getMostPostedDay(data) {
    var posts = data.data;
    const dateArray = [];
    posts.forEach(element => {
        dateArray.push(element.publishDate.slice(0, 10));
    });
    if (dateArray.length == 0)
        return null;
    const dateFrequencies = {};
    var dateMaxElement = dateArray[0];
    var dateMaxCount = 1;
    for (var i = 0; i < dateArray.length; i++) {
        var dateElement = dateArray[i];
        if (dateFrequencies[dateElement] == null)
            dateFrequencies[dateElement] = 1;
        else
            dateFrequencies[dateElement]++;
        if (dateFrequencies[dateElement] > dateMaxCount) {
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
    for (var i = 0; i < authorArray.length; i++) {
        var authorElement = authorArray[i];
        if (authorFrequencies[authorElement] == null)
            authorFrequencies[authorElement] = 1;
        else
            authorFrequencies[authorElement]++;
        if (authorFrequencies[authorElement] > authorMaxCount) {
            authorMaxElement = authorElement;
            authorMaxCount = authorFrequencies[authorElement];
        }
    }
    console.log(`The person with the most posts was ${authorMaxElement} with ${authorMaxCount} posts!`)
};

function getMostLikedPost(data) {
    var posts = data.data;
    const likesArray = [];
    const imageArray = [];
    posts.forEach(element => {
        likesArray.push(element.likes);
        imageArray.push(element.image);
    });
    if (imageArray.length == 0)
        return null;
    const imageFrequencies = {};
    var imageMaxElement = imageArray[0];
    var likesMaxCount = likesArray[0];
    for (var i = 0; i < imageArray.length; i++) {
        var imageElement = imageArray[i];
        if (imageFrequencies[imageElement] == null)
            imageFrequencies[imageElement] = likesArray[i];
        if (imageFrequencies[imageElement] > likesMaxCount) {
            imageMaxElement = imageElement;
            likesMaxCount = imageFrequencies[imageElement];
        }
    }
    console.log(`The most liked picture was ${imageMaxElement} with ${likesMaxCount} likes!`);
}


function getMostUsedTags(data) {
    var posts = data.data;
    const tagsArray = [];
    posts.forEach(element => {
        const singleTags = element.tags;
        singleTags.forEach(element => {
            tagsArray.push(element);
        });
    });
    if (tagsArray.length == 0)
        return null;
    const tagsFrequencies = {};
    var tagsMaxElement = tagsArray[0];
    var tagsMaxCount = 1;
    for (var i = 0; i < tagsArray.length; i++) {
        var tagsElement = tagsArray[i];
        if (tagsFrequencies[tagsElement] == null)
            tagsFrequencies[tagsElement] = 1;
        else
            tagsFrequencies[tagsElement]++;
        if (tagsFrequencies[tagsElement] > tagsMaxCount) {
            tagsMaxElement = tagsElement;
            tagsMaxCount = tagsFrequencies[tagsElement];
        }
    }
    const topFiveValues = Object.values(tagsFrequencies).sort((a, b) => b - a).slice(0, 5);
    const topFiveTags = Object.keys(tagsFrequencies).sort((a, b) => tagsFrequencies[b] - tagsFrequencies[a]).slice(0, 5);
    console.log(`The top five tags were "${topFiveTags[0]}" with ${topFiveValues[0]} uses, "${topFiveTags[1]}" with ${topFiveValues[1]} uses, "${topFiveTags[2]}" with ${topFiveValues[2]} uses, "${topFiveTags[3]}" with ${topFiveValues[3]} uses, and "${topFiveTags[4]}" with ${topFiveValues[4]} uses.`);
}