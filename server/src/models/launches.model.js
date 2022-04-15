const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['NASA', 'ZTM'],
    upcoming: true,
    success: true
};

launches.set(launch.flightNumber, launch);
// launches.get(100);

// Below is a data access function that processes the data so the controller doesn't have to do it
function getAllLaunches() {
    return Array.from(launches.values());
}

// Object.assign(object, option) --> Adds property to an existing JS Object. If property already exist,
// then it'll be updated
function addNewLauch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customer: ['Abeer Ali Khan'],
            flightNumber: latestFlightNumber
        })
    );
}

module.exports = {
    getAllLaunches,
    addNewLauch
}