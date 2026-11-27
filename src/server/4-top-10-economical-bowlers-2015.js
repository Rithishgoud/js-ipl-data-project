const path = require("path");
const readCsv = require("../utils/csv-reader");

async function top10EconomicalBowlers2015() {
    const matchesFilePath = path.join(__dirname, "../../data/matches.csv");
    const deliveriesFilePath = path.join(__dirname, "../../data/deliveries.csv");

    const matches = await readCsv(matchesFilePath);
    const deliveries = await readCsv(deliveriesFilePath);

    const matchIds2015 = new Set(
        matches
            .filter(match => match.season === "2015")
            .map(match => match.id)
    );

    const bowlerStats = {};

    for (const delivery of deliveries) {
        if (!matchIds2015.has(delivery.match_id)) continue;

        const bowler = delivery.bowler;

        const totalRuns = Number(delivery.total_runs);
        const byeRuns = Number(delivery.bye_runs || 0);
        const legByeRuns = Number(delivery.legbye_runs || 0);
        const penaltyRuns = Number(delivery.penalty_runs || 0);
        const wideRuns = Number(delivery.wide_runs || 0);
        const noBallRuns = Number(delivery.noball_runs || 0);

        const runsConceded =
            totalRuns - byeRuns - legByeRuns - penaltyRuns;

        const isLegalDelivery = wideRuns === 0 && noBallRuns === 0;

        if (!bowlerStats[bowler]) {
            bowlerStats[bowler] = {
                runsConceded: 0,
                legalBalls: 0
            };
        }

        bowlerStats[bowler].runsConceded += runsConceded;

        if (isLegalDelivery) {
            bowlerStats[bowler].legalBalls++;
        }
    }

    const bowlers = Object.entries(bowlerStats)
        .filter(([bowler, stats]) => stats.legalBalls > 0)
        .map(([bowler, stats]) => {
            const overs = stats.legalBalls / 6;

            return {
                bowler,
                runsConceded: stats.runsConceded,
                legalBalls: stats.legalBalls,
                overs: Number(overs.toFixed(2)),
                economy: Number((stats.runsConceded / overs).toFixed(2))
            };
        });

    bowlers.sort((a, b) => a.economy - b.economy);

    return bowlers.slice(0, 10);
}

module.exports = top10EconomicalBowlers2015;