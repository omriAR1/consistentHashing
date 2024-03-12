const percentile = require('stats-percentile');
const median = require('just-median');

function average(numbers) {
  return [...numbers].reduce((partialSum, a) => partialSum + a, 0)/numbers.length;
}

function getLoadStatistics(servers) {
  // first turn the servers into numbers, load as the value
  const serverLoad = [];
  let nonEmptyServers = 0;
  const nonEmptyLoad = [];
  for (let index = 0; index < servers.length; index++) {
    let serverItems = servers[index].getLoad();
    if (serverItems > 0) {
      nonEmptyServers++;
      nonEmptyLoad.push(serverItems);
    }
    serverLoad.push(serverItems);
  }


  return {
    servers: servers.length,
    serversWithItems: nonEmptyServers,
    twentyFifthPercntile: percentile(serverLoad, 25),
    seventyFifthPercntile: percentile(serverLoad, 75),
    med: median(serverLoad),
    nonEmptyMed: median(nonEmptyLoad),
    avg: average(serverLoad),
    nonEmptyAvg: average(nonEmptyLoad),
    nonEmptyMin: Math.min(...nonEmptyLoad),
    min: Math.min(...serverLoad),
    max: Math.max(...serverLoad)
  }
}

const maxNumber = Math.pow(2, 32);

module.exports = {
  getLoadStatistics,
  maxNumber,
};
