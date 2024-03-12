const { server, virtualServer } = require("./classes");
const { getLoadStatistics, maxNumber } = require("./stats");


function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1
}

function createRandomNumbers(amount, maxValue) {
  randomNumbers = [];
  for (let index = 0; index < amount; index++) {
    randomNumbers.push(getRandomInt(maxValue));
  }
  return randomNumbers;
}

function createRandomServers(amount, maxValue) {
  let randomServers = [];
  for (let index = 0; index < amount; index++) {
    randomServers.push(new server(getRandomInt(maxValue)));
  }
  return randomServers;
}


const randomKeys = createRandomNumbers(amount=10000, maxValue=maxNumber);
let randomServers = createRandomServers(amount=100, maxValue=maxNumber);


/*
Assign the keys to the servers according to the algorithm: a key is assigned to
smallest server that is larger than the key, wrapping around from [ 2^32 − 1] to 0.
*/

function assignKey(keyValue, serverList) {

  let servers = [...serverList];
  const onlyValues = [...servers].map(val => val.value);
  const smallestServerValue = Math.min(...onlyValues)
  const smallestServer = servers.find((element) => element.value===smallestServerValue);

  let serversLargerThanKey = servers.filter( it => parseInt(it.value) > parseInt(keyValue));
  
  // if the key is larger than any of the server values, use the next one
  if ( serversLargerThanKey === undefined || serversLargerThanKey.length === 0) {
    serversLargerThanKey = [smallestServer];
  }
  
   let sortedArray = serversLargerThanKey.sort((a, b) => a.value - b.value);
   sortedArray[0].assignItem(keyValue);
}

//assign all values to servers
for (let index = 0; index < randomKeys.length; index++) {
  assignKey(randomKeys[index], randomServers); 
}


console.table(getLoadStatistics(randomServers));



function createVirtualServers(phsyicalServerList, amountOfVirtualServers, phsyicalRatio) {
  let randomNumbers = createRandomNumbers(amountOfVirtualServers, maxNumber);
  let servers = [...phsyicalServerList]
  for (let serverIndex = 0; serverIndex < phsyicalServerList.length; serverIndex++) {
    let realServer = phsyicalServerList[serverIndex];
    for (let index = 0; index < phsyicalRatio; index++) {
      let randomServerValue = randomNumbers.pop();
      servers.push(new virtualServer(realServer, randomServerValue));
    }
  }
  return servers;
}

let newlyRandomServers = createRandomServers(amount=100, maxValue=maxNumber);
const enhancedServers = createVirtualServers(newlyRandomServers, 300, 3);

//assign all values to servers
for (let index = 0; index < randomKeys.length; index++) {
  assignKey(randomKeys[index], enhancedServers); 
}

console.table(getLoadStatistics(enhancedServers));
