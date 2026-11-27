const path = require("path");
const readCsv = require("../utils/csv-reader");

async function matchesPerYear() {
    const filePath = path.join(__dirname, "../../data/matches.csv");

    const matches = await readCsv(filePath);

    const matchesCountPerYear = {};

    for (const match of matches) {
        const season = match.season;

        if (!matchesCountPerYear[season]) {
            matchesCountPerYear[season] = 0;
        }

        matchesCountPerYear[season]++;
    }

    return matchesCountPerYear;
}

module.exports = matchesPerYear;