import Movie from "./models/Movie.js";



const starterMovies = [
{
title: "Inception",
description: "A thief enters dreams to steal secrets.",
releaseYear: 2010,
genre: "Sci-Fi",
director: "Christopher Nolan",
posterUrl: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg"
},
{
title: "Interstellar",
description: "A team travels through a wormhole to save humanity.",
releaseYear: 2014,
genre: "Sci-Fi",
director: "Christopher Nolan",
posterUrl: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg"
},
{
title: "The Dark Knight",
description: "Batman faces the Joker in Gotham.",
releaseYear: 2008,
genre: "Action",
director: "Christopher Nolan",
posterUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg"
},
{
title: "Titanic",
description: "A romance unfolds aboard the Titanic.",
releaseYear: 1997,
genre: "Romance",
director: "James Cameron",
posterUrl: "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png"
},
{
title: "Avatar",
description: "A marine explores the world of Pandora.",
releaseYear: 2009,
genre: "Sci-Fi",
director: "James Cameron",
posterUrl: "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg"
},
{
title: "The Matrix",
description: "A hacker discovers reality is a simulation.",
releaseYear: 1999,
genre: "Sci-Fi",
director: "The Wachowskis",
posterUrl: "https://upload.wikimedia.org/wikipedia/en/d/db/The_Matrix.png"
},
{
title: "Forrest Gump",
description: "The life journey of Forrest Gump.",
releaseYear: 1994,
genre: "Drama",
director: "Robert Zemeckis",
posterUrl: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg"
},
{
title: "The Avengers",
description: "Earth's heroes team up to stop Loki.",
releaseYear: 2012,
genre: "Action",
director: "Joss Whedon",
posterUrl: "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg"
},
{
title: "La La Land",
description: "A musician and actress chase their dreams.",
releaseYear: 2016,
genre: "Musical",
director: "Damien Chazelle",
posterUrl: "https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png"
}
];

const seedMoviesOnStartup = async () => {
    try {
        for (const movie of starterMovies) {
            await Movie.updateOne(
                { title: movie.title },
                { $setOnInsert: movie },
                { upsert: true }
            );
            }

        console.log("Movie seed check complete.");
    } catch (error) {
    console.error("Error seeding movies:", error.message);
    }
};


export default seedMoviesOnStartup;