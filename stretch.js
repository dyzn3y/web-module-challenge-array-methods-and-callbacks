const { fifaData } = require('./fifa.js')

const totalWCAppearances = (initials) => {
    const homeTeam = fifaData.filter(item => item['Home Team Initials'] === initials)
    const awayTeam = fifaData.filter(item => item['Away Team Initials'] === initials)
    return homeTeam.length + awayTeam.length
}

console.log('Total WC Appearances: ', totalWCAppearances('MEX'));

const finalsTie = (data) => {
    function getFinals(array) {
        const allFinals = array.filter(function(item){
            return item.Stage === 'Final';
        })
        return allFinals;
     }
    const finals = getFinals(data)
    const finalsWinners = finals.map(item => {
        if (item['Home Team Goals'] > item ['Away Team Goals']) {
            return item ['Home Team Name']
        } else if (item['Home Team Goals'] === item ['Away Team Goals']) {
            let winCondition = item['Win conditions'].split(' ')
            return winCondition[0]
        } else if (item['Home Team Goals'] < item ['Away Team Goals']) {
            return item['Away Team Name']
        }
    });
    return finalsWinners;
}

console.log('Stretch 2: ', finalsTie(fifaData));

function totalGoals (initials) {
    const filteredData = fifaData.filter(item => {
        if (item['Home Team Initials'] === initials) {
            return item
        } if (item['Away Team Initials'] === initials) {
            return item
        }
    })
    const result = filteredData.reduce((acc, item) => {
        if (item['Home Team Initials'] === initials) {
            return acc + item['Home Team Goals']
        } if (item['Away Team Initials'] === initials) {
            return acc + item['Away Team Goals']
        }
    }, 0)
    return result;
}

console.log('Stretch 3: ', totalGoals('BRA'));