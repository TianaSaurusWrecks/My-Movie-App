/* Create a JS array to maintain a list of the movie object defined in part 4 and build a web-based UI to manage the movie list using HTML, CSS, and JS.

The movie list needs to be created as a class (create a list that stores a movie list, a movieList class, and a movie class) */

/* from part 4: */
class Movie {
    constructor(movieID, title, year, rating) {
        this.movieID = movieID; 
        this.title = title;
        this.year = year;
        this.rating = rating;
    }
}

class MovieList {
    constructor() {
        this.movies = []; // internal array to hold all movie objects
    }
    // add a new movie to the list
    add(movie) {
        this.movies.push(movie);
    }
    // get all movies
    getAll() {
        return this.movies;
    }
    // search for a movie by ID or title 
    search(query) {
        return this.movies.filter(
            m =>
                m.movieID.toString() === query.toString() ||
            m.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    // sort by title A-Z
    sortAZ() {
        this.movies.sort((a, b) => a.title.localeCompare(b.title));
    }
    // sort by title Z-A
    sortZA() {
        this.movies.sort((a, b) => b.title.localeCompare(a.title));
    }
    // sort by rating, highest first
    sortBest() {
        this.movies.sort((a, b) => b.rating - a.rating);
    }
}

// instance of MovieList class
const movieList = new MovieList();
/* Base Movie List: */
const baseMovies = [
    new Movie(2, "The Princess Bride", 1987, 5),
    new Movie(6, "Labyrinth", 1986, 5),
    new Movie(1, "The NeverEnding Story", 1984, 5),
    new Movie(4, "Spy", 2015, 5),
    new Movie(8, "Rat Race", 2001, 5),
    new Movie(13, "Thor", 2011, 3),
    new Movie(10, "The Mask", 1994, 5),
    new Movie(14, "The Open House", 2018, 1),
    new Movie(5, "Stand by Me", 1986, 5),
    new Movie(9, "The Notebook", 2004, 5),
    new Movie(7, "The Shawshank Redemption", 1994, 5),
    new Movie(3, "Interstellar", 2014, 4),
    new Movie(11, "Citizen Kane", 1941, 1),
    new Movie(12, "Breakfast at Tiffany's", 1961, 2),
];

/* load base list into movieList */
baseMovies.forEach(movie => movieList.add(movie));
// for testing: 
console.log(movieList.getAll());

const output = document.getElementById('output');

// display movie list to html
function displayMovies(movies, titleText = "Movie List") {
    output.textContent = ""; 

    const title = document.createElement("h2");
    title.textContent = titleText;
    output.appendChild(title);

    if (movies.length === 0) {
        const none = document.createElement("p");
        none.textContent = "No Movies to Display";
        output.appendChild(none);
        return;
    }

    // loop through movies and create DOM elements
    movies.forEach((m) => {
        const movieDiv = document.createElement("div");
        movieDiv.className = "movie-item";

        const strong = document.createElement("strong");
        strong.textContent = m.title; // bold text for titles 

        const details = document.createElement("p");
        details.textContent = `(${m.year}) - ID: ${m.movieID} | Rating: ${m.rating}/5`;

        movieDiv.appendChild(strong);
        movieDiv.appendChild(document.createElement("br"));
        movieDiv.appendChild(details);

        output.appendChild(movieDiv);
        output.appendChild(document.createElement("hr")); // horizontal rule (line)

    });

}

// User Interface section functions
// add movie
function showAddMovie() {
    output.textContent = ""; // clear screen

    const heading = document.createElement("h2");
    heading.textContent = "Add a New Movie";
    output.appendChild(heading);

    //create form inputs
    const fields = [
        {id: "movieID", type: "number", placeholder: "Movie ID" },
        {id: "title", type: "text", placeholder: "Title" },
        {id: "year", type: "number", placeholder: "Year" },
        {id: "rating", type: "number", placeholder: "Rating (1 - 5)" },
    ];

    fields.forEach((f) => {
        const input = document.createElement("input");
        input.id = f.id;
        input.type = f.type;
        input.placeholder = f.placeholder;
        input.className = "movie-input";
        output.appendChild(input);
        output.appendChild(document.createElement("br"));

    });

    const button = document.createElement("button");
    button.textContent = "Add Movie";
    output.appendChild(button);
    button.className = "action-btn";

    // handle Submit
    button.onclick = () => {
        const id = Number(document.getElementById("movieID").value);
        const title = document.getElementById("title").value.trim();
        const year = Number(document.getElementById("year").value);
        const rating = Number(document.getElementById("rating").value);

        if (!id || !title || !year || !rating) {
            alert("Please fill in all fields.");
            return;
        }

        // ensure all movie IDs are different
        if (movieList.getAll().some((m) => m.movieID === id)) {
            alert("A movie with this ID already exists.");
            return;
        }

        const newMovie = new Movie(id, title, year, rating);
        movieList.add(newMovie);

        alert("Movie added Successfully!");
        displayMovies(movieList.getAll(), "Updated Movie List");
    };
}

// Display Movie List Section
function showDisplayMovies() {
    output.textContent = "";

    const heading = document.createElement("h2");
    heading.textContent = "Movie List";
    output.appendChild(heading);



    // Initial display
    displayMovies(movieList.getAll(), "Movie List");
}

// Search Movie Function
function showSearchMovie() {
    output.textContent = "";

    const heading = document.createElement("h2");
    heading.textContent = "Search Movie";
    output.appendChild(heading);

    const input = document.createElement("input");
    input.id = "searchInput";
    input.placeholder = "Enter Movie ID or Title";
    output.appendChild(input);
    input.className = "movie-input";

    const searchBtn = document.createElement("button");
    searchBtn.textContent = "Search";
    output.appendChild(searchBtn);
    searchBtn.className = "action-btn";

    const resultsDiv = document.createElement("div");
    resultsDiv.id = "searchResults";
    output.appendChild(resultsDiv);

    searchBtn.onclick = () => {
        const query = input.value.trim();
        const results = movieList.search(query);

        resultsDiv.textContent = ""; //clear previous results

        if (results.length === 0) {
            const msg = document.createElement("p");
            msg.textContent = "No results found";
            resultsDiv.appendChild(msg);
            return;
        }

        results.forEach((m) => {
            const movieDiv = document.createElement("div");

            const strong = document.createElement("strong");
            strong.textContent = m.title;

            const info = document.createElement("p");
            info.textContent = `(${m.year}) - ID: ${m.movieID} | Rating: ${m.rating}/5`;

            movieDiv.appendChild(strong);
            movieDiv.appendChild(document.createElement("br"));
            movieDiv.appendChild(info);

            resultsDiv.appendChild(movieDiv);
            resultsDiv.appendChild(document.createElement("hr"));
        });
    };
}

// Sort Movie Section
function showSortMovie() {
    output.textContent = "";

    const heading = document.createElement("h2");
    heading.textContent = "Sort Movies";
    output.appendChild(heading);

    const sortAZ = document.createElement("button");
    sortAZ.textContent = "Sort A - Z";
    sortAZ.className = "action-btn";

    const sortZA = document.createElement("button");
    sortZA.textContent = "Sort Z - A";
    sortZA.className = "action-btn";

    const sortBest = document.createElement("button");
    sortBest.textContent = "Best Movies";
    sortBest.className = "action-btn";

    output.appendChild(sortAZ);
    output.appendChild(sortZA);
    output.appendChild(sortBest);

    const sortedDiv = document.createElement("div");
    sortedDiv.id = "sortedMovies";
    output.appendChild(sortedDiv);

    const displaySorted = (title) => {
        sortedDiv.textContent = "";
        displayMovies(movieList.getAll(), title);
    };

    sortAZ.onclick = () => {
        movieList.sortAZ();
        displaySorted("Movies sorted A - Z: ");
    };

    sortZA.onclick = () => {
        movieList.sortZA();
        displaySorted("Movies sorted Z - A: ");
    };

    sortBest.onclick = () => {
        movieList.sortBest();
        displaySorted("Movies sorted High - Low Rating");
    };
}

// Delete Movie Section
function showDeleteMovie() {
    output.textContent = "";

    const heading = document.createElement("h2");
    heading.textContent = "Delete a Movie";
    output.appendChild(heading);

    const input = document.createElement("input");
    input.id = "deleteInput";
    input.placeholder = "Enter Movie ID or Title to Delete";
    input.className = "movie-input";
    output.appendChild(input);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "action-btn";
    output.appendChild(deleteBtn);

    deleteBtn.onclick = () => {
        const query = input.value.trim();
        if (!query) {
            alert("Please enter a movie ID or title");
            return;
        }

        const beforeCount = movieList.movies.length;
        movieList.movies = movieList.movies.filter(
            m => m.movieID.toString() !== query &&
            !m.title.toLowerCase().includes(query.toLowerCase())
        );

        const afterCount = movieList.movies.length;

        if (afterCount < beforeCount) {
            alert("Movie deleted successfully!");
        }
        else {
            alert("No matching movie found");
        }

        displayMovies(mmovieList.getAll(), "Updated Movie List");

        };
    }

// Refresh Movie Section
//
function refreshMoviesBtnMovies() {
    output.textContent = "";

    const heading = document.createElement("h2");
    heading.textContent = "Movie List";
    output.appendChild(heading);

    const refreshBtn = document.createElement("button");
    refreshBtn.textContent = "Refresh";
    output.appendChild(refreshBtn);

    refreshBtn.onclick = () => displayMovies(movieList.getAll(), "Movie List");
    
    
    
}


// Event Listeners for main buttons
document.getElementById("addMovieBtn").onclick = showAddMovie;
document.getElementById("displayMoviesBtn").onclick = showDisplayMovies;
document.getElementById("searchMoviesBtn").onclick = showSearchMovie;
document.getElementById("sortMoviesBtn").onclick = showSortMovie;
document.getElementById("deleteMovieBtn").onclick = showDeleteMovie;
document.getElementById("refreshMoviesBtn").onclick = showDisplayMovies;

// Display Movie List on Start
window.onload = () => {
    displayMovies(movieList.getAll(), "Movie List");
}