const path = require("path");
const readCsv = require("../utils/csv-reader");

async function matchesWonPerTeamPerYear() {
    const filePath = path.join(__dirname, "../../data/matches.csv");

    const matches = await readCsv(filePath);

    const result = {};

    for (const match of matches) {
        const season = match.season;
        const winner = match.winner;

        if (!winner) continue;

        if (!result[season]) {
            result[season] = {};
        }

        if (!result[season][winner]) {
            result[season][winner] = 0;
        }

        result[season][winner]++;
    }

    return result;
}

module.exports = matchesWonPerTeamPerYear;