const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["NASA", "ZTM"],
  success: true,
  upcoming: true,
};

saveLaunch(launch);

async function existsLaunchId(id) {
  return await launchesDatabase.findOne({
    flightNumber: id,
  });
}

async function getLatestFlightNumber() {
  // findOne returns the first document
  // sort('-flightNumber') sorts the documents in descending order
  // in this way, we will get the latest flightNumber
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;

  return latestLaunch.flightNumber;
}

// Below is a data access function that processes the data so the controller doesn't have to do it
async function getAllLaunches() {
  // return Array.from(launches.values()); // old code: without mongodb database
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplarName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found!");
  }

  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

// Object.assign(object, option) --> Adds property to an existing JS Object. If property already exist,
// then it'll be updated

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  //   const newLaunch = Object.assign(launch, {
  //     success: true,
  //     upcoming: true,
  //     customers: ["Abeer Ali Khan"],
  //     flightNumber: newFlightNumber,
  //   });

  const newLaunch = {
    ...launch,
    success: true,
    upcoming: true,
    customers: ["Abeer Ali Khan"],
    flightNumber: newFlightNumber,
  };

  await saveLaunch(newLaunch);
}

async function abortLaunch(id) {
  const aborted = await launchesDatabase.updateOne(
    { flightNumber: id },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.modifiedCount === 1;
}

module.exports = {
  getAllLaunches,
  existsLaunchId,
  abortLaunch,
  scheduleNewLaunch,
};
