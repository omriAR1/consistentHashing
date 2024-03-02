
function median(numbers) {
  const sorted = Array.from(numbers).sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

function average(numbers) {
  return [...numbers].reduce((partialSum, a) => partialSum + a, 0)/numbers.length;
}

function percentile(arr, val) {
  let count = 0;
  arr.forEach(v => {
    if (v < val) {
      count++;
    } else if (v == val) {
      count += 0.5;
    }
  });
  return 100 * count / arr.length;
}

function getLoadStatistics(servers) {
  // first turn the servers into numbers, load as the value
  serverLoad = [];
  nonEmptyServers = 0;
  nonEmptyLoad = [];
  for (let index = 0; index < servers.length; index++) {
    serverItems = servers[index].getLoad();
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