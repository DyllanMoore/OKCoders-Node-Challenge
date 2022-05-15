const fetch = require('node-fetch');
fetch('https://dummyapi.io/data/v1/post?limit=10', {
    headers: {
        'app-id': '627fd9d2eb72ad45b90b9e2f'
    }
})
    .then((response) => response.json())
    .then((data) => test(data)
    );

function test(data) {
    getMostPostedDay(data);
}

function getMostPostedDay(data) {
    const posts = data.data;
    const dateArray = [];
    const date = posts.forEach(element => {
        dateArray.push(element.publishDate.slice(0, 10));
    });
};

