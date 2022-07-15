// slice is added to skip the part of the array that would return Node.js' and this app's relative paths
// process.argv.length allows us to right as many argv values as we want
const profileDataArgs = process.argv.slice(2, process.argv.length);

const printProfileData = (profileDataArr) => {
    profileDataArr.forEach((profileItem) => console.log(profileItem));
}

printProfileData(profileDataArgs);