const { fifaData } = require('./fifa.js');

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/
const finals2014 = fifaData.filter(function(item){
    return item.Year === 2014 && item.Stage === 'Final';
});
console.log(finals2014);
//(a) Home Team name for 2014 world cup final
console.log('Task 1a', finals2014[0]['Home Team Name']);
//(b) Away Team name for 2014 world cup final
console.log('Task 1b', finals2014[0]['Away Team Name']);
//(c) Home Team goals for 2014 world cup final
console.log('Task 1c', finals2014[0]['Home Team Goals']);
//(d) Away Team goals for 2014 world cup final
console.log('Task 1d', finals2014[0]['Away Team Goals']);
//(e) Winner of 2014 world cup final */
console.log('Task 1e', finals2014[0]['Win conditions']);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(array) {
    const allFinals = array.filter(function(item){
        return item.Stage === 'Final';
    })
    return allFinals;
 }


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array, getFinalsCB) {
    return getFinalsCB(array).map(item =>item.Year);
}


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(data, getFinalsCB) {
    return getFinalsCB(data).map(item => item['Home Team Goals'] > item ['Away Team Goals'] ? item ['Home Team Name'] : item ['Away Team Name']);
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(data,  getFinalsCB, getYearsCB, getWinnersCB) {
    const winners = getWinnersCB(data, getFinalsCB);
    const years = getYearsCB(data, getFinalsCB);
    return winners.map((item, index) => `In ${years[index]}, ${item} won the world cup!`);
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function `getAverageGoals` to do the following: 
 1. Receive a callback function as a parameter that will take `getFinals` (from task 2) as an argument; ensure you pass in `fifaData` as its argument
 
 💡 HINT: Example of invocation: `getAverageGoals(getFinals(fifaData));`

 2. Calculate the AVERAGE number of the TOTAL home team goals AND TOTAL away team goals scored PER MATCH

 3. Round to the second decimal place and return the value
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
*/

function getAverageGoals(getFinalsCB) {
    const averageHomeGoals = getFinalsCB.reduce((acc, item) => {
        return acc + item['Home Team Goals']
    }, 0)

    const averageAwayGoals = getFinalsCB.reduce((acc, item) => {
        return acc + item['Away Team Goals']
    }, 0)
    const average = ((averageHomeGoals + averageAwayGoals) / getFinalsCB.length).toFixed(2)
    return average
 }

console.log('Task 6: ', getAverageGoals(getFinals(fifaData), fifaData), 'to equal 3.58');


/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {    const finals = getFinals(data)
    const winners = getWinners(data, getFinals)
    const homeTeam = [] 
    const awayTeam = []
    finals.forEach(element => {
        element === winners
        homeTeam.push(element)
    });
    finals.forEach(element => {
        element === winners
        awayTeam.push(element)
    })
    const homeTeamInitials = homeTeam.filter(item => item['Home Team Initials'] === teamInitials)
    const awayTeamInitials = awayTeam.filter(item => item['Away Team Initials'] === teamInitials)
    const homeTie = homeTeamInitials.filter(item => item['Win conditions'])
    const awayTie = awayTeamInitials.filter(item => item['Win conditions'])
    let awayTeamWins = awayTeamInitials.reduce(function(acc, item) {
        
        if (item['Away Team Goals'] > item['Home Team Goals']) {
            acc++
        }
        return acc
    }, 0)

    let homeTeamWins = homeTeamInitials.reduce(function(acc, item) {
        if (item['Home Team Goals'] > item['Away Team Goals']) {
            acc++
        }
        return acc
    }, 0)
    let comparisonString;
    if (homeTie) {
        homeTie.forEach(element => {
            comparisonString = element['Win conditions'].split('').splice(0, 3).join('').toUpperCase()
            if (comparisonString === teamInitials) {
                homeTeamWins++
            }

        })
    } if (awayTie) {
        awayTie.forEach(element => {
            comparisonString = element['Win conditions'].split('').splice(0, 3).join('').toUpperCase()
            if (comparisonString === teamInitials) {
                awayTeamWins++
            }

        })
    }

    return awayTeamWins + homeTeamWins
}
console.log('Stretch 1: ', getCountryWins(fifaData, 'ITA'));



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
    const finals = getFinals(data);
    const resultArray = [];
    finals.forEach(item => {
        resultArray.push(item['Home Team Goals'])
        resultArray.push(item['Away Team Goals'])
    })
    const highestScoreIndex = resultArray.sort().length-1
    const highestScore = resultArray[highestScoreIndex];
    const result = finals.map(item => {
        if (item['Home Team Goals'] === highestScore) {
            return item['Home Team Name']
        } else if (item['Away Team Goals'] === highestScore) {
            return item['Away Team Name']
        }
    })
    function greatestScore (value) {
        return value !== undefined
    }
    return result.filter(greatestScore)[0]
}
console.log('Stretch 2: ', getGoals(fifaData));


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
    const finals = getFinals(data)
    const scoreDifferenceHomeTeamArray = finals.map(item => {
        let score = item['Home Team Goals'] - item['Away Team Goals']
        let teamName = item['Home Team Name']
        return {teamName: teamName, score: score}
    })
    const scoreDifferenceHomeTeam = scoreDifferenceHomeTeamArray.sort((a, b) => a.score - b.score)
    const scoreDifferenceAwayTeamArray = finals.map(item => {
        let score = item['Away Team Goals'] - item['Home Team Goals']
        let teamName = item['Away Team Name']
        return {teamName: teamName, score: score}
    })
    const scoreDifferenceAwayTeam = scoreDifferenceAwayTeamArray.sort((a, b) => a.score - b.score)
    const badScoreHomeIndex = scoreDifferenceHomeTeam.length-1
    const badScoreAwayIndex = scoreDifferenceAwayTeam.length-1
    const badScoreHome = scoreDifferenceHomeTeamArray[badScoreHomeIndex].score
    const badScoreAway = scoreDifferenceAwayTeamArray[badScoreAwayIndex].score
    const badTeamArray = [];
    let badTeam
    if (badScoreHome === badScoreAway) {
        scoreDifferenceAwayTeam.filter(item => {
            if (item.score === badScoreAway)
                if (badTeamArray.includes(item.teamName) === false)
                    badTeamArray.push(item.teamName)
                else
                badTeam = item.teamName
        })
        scoreDifferenceHomeTeam.filter(item => {
            if(item.score === badScoreHome)
                if (badTeamArray.includes(item.teamName) === false)
                    badTeamArray.push(item.teamName)
                else
                badTeam = item.teamName
        })
    } else if (badScoreHome > badScoreAway) {
        scoreDifferenceHomeTeam.filter(item => {
            if(item.score === badScoreHome)
                if (badTeamArray.includes(item.teamName) === false)
                    badTeamArray.push(item.teamName)
                else
                badTeam = item.teamName
        })
    } else if (badScoreAway > badScoreHome) {
        scoreDifferenceAwayTeam.filter(item => {
            if (item.score === badScoreAway)
                if (badTeamArray.includes(item.teamName) === false)
                    badTeamArray.push(item.teamName)
                else
                    badTeam = item.teamName
        })
    }
    if (badTeam) {
        return badTeam
    } else {
        return badTeamArray;
    }
}

console.log('Stretch 3: ', badDefense(fifaData));

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
