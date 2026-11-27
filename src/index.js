const readline = require("readline");

const matchesPerYear = require("./server/1-matches-per-year");
const matchesWonPerTeamPerYear = require("./server/2-matches-won-per-team-per-year");
const extraRunsConcededPerTeam2016 = require("./server/3-extra-runs-conceded-2016");
const top10EconomicalBowlers2015 = require("./server/4-top-10-economical-bowlers-2015");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer);
        });
    });
}

function printResult(title, data) {
    console.log(`\n========== ${title} ==========`);
    console.log(JSON.stringify(data, null, 2));
}

async function main() {
    try {
        while (true) {
            console.log("\n========== IPL DATA ANALYSIS ==========");
            console.log("1. Matches played per year");
            console.log("2. Matches won per team per year");
            console.log("3. Extra runs conceded per team in 2016");
            console.log("4. Top 10 economical bowlers in 2015");
            console.log("5. Display all results");
            console.log("0. Exit");

            const choice = await askQuestion("\nEnter your choice: ");

            switch (choice.trim()) {
                case "1": {
                    const data = await matchesPerYear();
                    printResult("Matches Played Per Year", data);
                    break;
                }

                case "2": {
                    const data = await matchesWonPerTeamPerYear();
                    printResult("Matches Won Per Team Per Year", data);
                    break;
                }

                case "3": {
                    const data = await extraRunsConcededPerTeam2016();
                    printResult("Extra Runs Conceded in 2016", data);
                    break;
                }

                case "4": {
                    const data = await top10EconomicalBowlers2015();
                    printResult("Top 10 Economical Bowlers in 2015", data);
                    break;
                }

                case "5": {
                    const data1 = await matchesPerYear();
                    const data2 = await matchesWonPerTeamPerYear();
                    const data3 = await extraRunsConcededPerTeam2016();
                    const data4 = await top10EconomicalBowlers2015();

                    printResult("Matches Played Per Year", data1);
                    printResult("Matches Won Per Team Per Year", data2);
                    printResult("Extra Runs Conceded in 2016", data3);
                    printResult("Top 10 Economical Bowlers in 2015", data4);
                    break;
                }

                case "0":
                    console.log("Exiting IPL Data Analysis.");
                    rl.close();
                    return;

                default:
                    console.log("Invalid choice. Please enter a number between 0 and 5.");
            }
        }
    } catch (error) {
        console.error("Error:", error);
        rl.close();
    }
}

main();