const path = require("path");
const readCsv = require("../utils/csv-reader");

async function extraRunsConcededPerTeam2016() {
    const matchesFilePath = path.join(__dirname, "../../data/matches.csv");
    const deliveriesFilePath = path.join(__dirname, "../../data/deliveries.csv");

    const matches = await readCsv(matchesFilePath);
    const deliveries = await readCsv(deliveriesFilePath);

    const matchIds2016 = new Set(
        matches
            .filter(match => match.season === "2016")
            .map(match => match.id)
    );

    const extraRunsPerTeam = {};

    for (const delivery of deliveries) {
        if (!matchIds2016.has(delivery.match_id)) continue;

        const bowlingTeam = delivery.bowling_team;
        const extraRuns = Number(delivery.extra_runs);

        if (!extraRunsPerTeam[bowlingTeam]) {
            extraRunsPerTeam[bowlingTeam] = 0;
        }

        extraRunsPerTeam[bowlingTeam] += extraRuns;
    }

    return extraRunsPerTeam;
}

module.exports = extraRunsConcededPerTeam2016;