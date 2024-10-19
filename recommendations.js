// recommendations.js

const recommendations = [
    {
        title: "Weightlifting Fairy Kim Bok-joo",
        type: "Series",
        genre: "Romantic Comedy, Slice of Life",
        path: [0, 0, 0, 0, 1],
        description: "A charming story about the lives and loves of college athletes." ,
        poster: "Weightlifting Fairy Kim Bok Joo.jpg"
    },
    {
        title: "Crash Landing on You",
        type: "Series",
        genre: "Romance, Action, Drama",
        path: [0, 1, 1, 0, 0],
        description: "A South Korean heiress accidentally lands in North Korea, where she meets a North Korean soldier." ,
        poster: "Crash Landing on You.jpg"
    },
    {
        title: "Kingdom",
        type: "Series",
        genre: "Historical, Thriller, Zombie, Action",
        path: [1, 1, 2, 3, 3],
        description: "A prince uncovers a plague turning people into zombies in the Joseon Dynasty." ,
        poster: "Kingdom.jpg"
    },
    {
        title: "Splash Splash Love",
        type: "Short Series",
        genre: "Fantasy, Romance, Time Travel",
        path: [2, 0, 2, 2, 2],
        description: "A high school girl is transported to the Joseon Dynasty and meets the king." ,
        poster: "Splash Splash Love.jpg"
    },
    {
        title: "Parasite",
        type: "Movie",
        genre: "Thriller, Drama, Dark Comedy",
        path: [1, 2, 1, 3, 0],
        description: "A gripping story of social inequality, where a poor family infiltrates a wealthy household." ,
        poster: "Parasite.jpg"
    },
    {
        title: "Fight for My Way",
        type: "Series",
        genre: "Romance, Comedy, Slice of Life",
        path: [3, 1, 0, 2, 2],
        description: "A group of friends struggles to achieve their dreams while navigating personal and professional lives." ,
        poster: "Fight for My Way.jpg"
    },
    {
        title: "Train to Busan",
        type: "Movie",
        genre: "Thriller, Zombie, Action",
        path: [1, 2, 3, 0, 3],
        description: "A man and his daughter are trapped on a train to Busan during a zombie outbreak." ,
        poster: "Train to Busan.jpg"
    },
    {
        title: "It’s Okay to Not Be Okay",
        type: "Series",
        genre: "Psychological, Romance, Drama",
        path: [0, 1, 3, 3, 0],
        description: "A love story between a psychiatric caregiver and an antisocial children’s book author.",
        poster: "It’s Okay to Not Be Okay.jpg"
    },
    {
        title: "My ID is Gangnam Beauty",
        type: "Series",
        genre: "Romance, Slice of Life, Coming-of-Age",
        path: [0, 0, 0, 1, 1],
        description: "A young woman undergoes plastic surgery in hopes of a fresh start at university.",
        poster: "My ID is Gangnam Beauty.jpg"
    },
    {
        title: "Vincenzo",
        type: "Series",
        genre: "Action, Crime, Dark Comedy",
        path: [1, 1, 1, 0, 3],
        description: "A Korean-Italian mafia lawyer returns to Korea to fight a corrupt conglomerate." ,
        poster: "Vincenzo.jpg"
    }
];

// Function to find and display recommendation
function getRecommendation(userAnswers) {
    // Try to find an exact match first
    for (let i = 0; i < recommendations.length; i++) {
        const recPath = recommendations[i].path;

        // Check if the user's answers exactly match a recommendation path
        if (JSON.stringify(userAnswers) === JSON.stringify(recPath)) {
            return recommendations[i];  // Return the matched recommendation
        }
    }

    // If no exact match, find the closest match
    let bestMatch = null;
    let highestScore = 0;

    recommendations.forEach(rec => {
        let score = 0;
        rec.path.forEach((criterion, index) => {
            // Compare each answer and count how many match
            if (criterion === userAnswers[index]) {
                score++;
            }
        });

        // Update the bestMatch if this recommendation has a higher score
        if (score > highestScore) {
            bestMatch = rec;
            highestScore = score;
        }
    });

    // Return the best match or fall back to "Parasite" if no close matches are found
    return bestMatch && highestScore > 0 ? bestMatch : recommendations.find(rec => rec.title === "Parasite");
}


