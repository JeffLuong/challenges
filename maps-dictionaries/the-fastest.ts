// We want to optimize our couriers routes to provide the fastest delivery possible. You're given route information for the previous year:

// [ (RouteId:Int, CourierId:Int, DeliveryTime:Int) ]

// Constraints: 

// * All values are positive integers.
// * DeliveryTime is the number of minutes elapsed between when the courier left the pharmacy and completed the delivery. 
// * Provided array is un-ordered.

// 1. Find the fastest delivery times for each route. 

// Example: 
// Input : [ 
//   [1, 1, 10],
//   [1, 2, 12],
//   [1, 3, 9],
//   [2, 1, 11],
//   [2, 2, 15],
//   [2, 3, 10]
// ]
// Answer: [ [1,9], [2,10] ]
// Explanation: For Route(1), the shortest delivery time was 9 minutes.

type Times = [number[]];

type RouteMap = {
  [routeId: string]: {
    [courierId: string]: number[]
  }
};

function createRouteTimesMap(arr: Times) {
  return arr.reduce((a: RouteMap, c: number[]): RouteMap => {
    const [rouId, courId, time] = c;
    if (a[rouId]) {
      if (a[rouId][courId]) {
        a[rouId][courId].push(time);
      } else {
        a[rouId][courId] = [time];
      }
    } else {
      a[rouId] = { [courId]: [time] };
    }
    return a;
  }, {});
}

function getFastestByRoute(arr: Times) {
  const routes = createRouteTimesMap(arr);
  // Return only the route and the fastest time for each route.
  return Object.keys(routes).map(a => {
    const times = Object.values(routes[a]).flat(2);
    return [a, Math.min(...times)];
  });
}

// 2. Find each couriers average time per route. 
// Example: 
//   Input : [ 
//     [1, 1, 20],
//     [1, 1, 22],
//     [1, 2, 12],
//     [1, 2, 13],
//     [2, 1, 25],
//     [2, 1, 26],
//     [2, 2, 9],
//     [2, 2, 10]
//   ] 
//   Answer: [
//     [1, 1, 21],
//     [1, 2, 12.5],
//     [2, 1, 25.5],
//     [2, 2, 9.5]
//   ]
//   Explanation: Courier 1 has two delivery times for route 1, 20 and 22 the average of which is (20 + 22) / 2 = 21. Repeating this process for each courier and route we get the results above. 

function getAveragesForCouriers(arr: Times) {
  const routes = createRouteTimesMap(arr);
  const averageTimes = [];

  for (const id in routes) {
    const courIds = Object.keys(routes[id]);
    const averages = courIds.reduce((a: (string | number)[][], cId) => {
      const times = routes[id][cId];
      const sum = times.reduce((sum, curr) => sum + curr, 0);
      return [...a, [id, cId, sum/times.length]];
    }, []);
    averageTimes.push(...averages);
  }
  return averageTimes;
}

// 3. Using the information from the previous two parts, find the fastest courier by comparing each courier's average time per route vs. the fastest time for that route. The courier with the lowest overall difference between their average time for every route and the fastest time for every route has the best score. eg.

// Courier   Route   CourierAvgTimeForRoute  FastestTimeForRoute    Difference
// 1          1         21                          12                     9
// 2          1         12.5                        12                     0.5
// 1          2         25.5                         9                     16.5
// 2          2         9.5                          9                     0.5

// Courier 1's overall difference for all routes = 9 + 16.5 = 25.5
// Courier 2's overall difference for all routes = 0.5 + 0.5 = 1
// Courier 2 has the highest score and is the fastest courier.

// Example: 

// Input: [
//   [1, 1, 20],
//   [1, 1, 22],
//   [1, 2, 12],
//   [1, 2, 13],
//   [2, 1, 25],
//   [2, 1, 26],
//   [2, 2, 9],
//   [2, 2, 10]
// ]
// Answer: 2

type Scores = {
  [courierId: string]: number
};

function findFastestCourier(arr: Times) {
  const routes = createRouteTimesMap(arr);
  const scores: Scores = {};

  for (const id in routes) {
    // Extract all times from all couriers in current route and flatten array.
    const routeTimes = Object.values(routes[id]).flat(2);
    // Find the fastest time of this particular route.
    const fastest = Math.min(...routeTimes);
    const courIds = Object.keys(routes[id]);

    // Loop through each courier to see get their average times within this route.
    courIds.forEach(cId => {
      const courTimes = routes[id][cId];
      const sum = courTimes.reduce((acc, curr) => acc + curr, 0);
      const diff = (sum / courTimes.length) - fastest;
      scores[cId] = scores[cId] ? scores[cId] + diff : diff;
    });
  }

  const lowestDiff = Math.min(...Object.values(scores));
  return Object.keys(scores).find(k => scores[k] === lowestDiff);
}