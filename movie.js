let container = document.querySelector("#container");

async function getMovieData() {
    try {
        let movie = document.getElementById("query").value;
        let res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=1715bde2b5c44835c8ebd0966abe61ad&language=en-US&page=1&query=${movie}`
        );
        let data = await res.json();

        return data.results;
    } catch (err) {
        console.log(err);
    }
}

async function main() {
    let data = await getMovieData();
    if (data == undefined) {
        return false;
    }
    console.log(data);
    appendData(data);
}

function appendData(movie) {
    movie.map(function(ele) {
        var div = document.createElement("div");
        div.setAttribute("id", "imgdiv");

        var img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w185/${ele.poster_path}`;

        var div2 = document.createElement("div");

        var title = document.createElement("h5");
        title.setAttribute("id", "title");
        title.textContent = ele.title;

        var release = document.createElement("p");
        release.textContent = `Released:  ${ele.release_date}`;

        var rating = document.createElement("p");
        rating.setAttribute("id", "rating");

        rating = ele.vote_average;

        div2.append(title, release, rating);

        div.append(img, div2);
        container.append(div);
    });
}
var timerId;

function debounce(func, delay) {
    container.textContent = null;
    if (timerId) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(function() {
        func();
    }, delay);
}