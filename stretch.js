const { fifaData } = require('./fifa.js')

const totalWCAppearances = (initials) => {
    const homeTeam = fifaData.filter(item => item['Home Team Initials'] === initials)
    const awayTeam = fifaData.filter(item => item['Away Team Initials'] === initials)
    return homeTeam.length + awayTeam.length
}

console.log('Total WC Appearances: ', totalWCAppearances('MEX'));