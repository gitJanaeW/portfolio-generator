const inquirer = require('inquirer');
console.log(inquirer);

// fs stands for "file system", a Node module that can create multiple file types, including TXT, PDF, HTML & JSON
// require is a built in global function of Node that allows this script to access the fs module functions
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(userName, gitHub);

// // The arguments required for fs.writeFile: file name/type, the data that will be written onto the file, a callback function used for error handling
// fs.writeFile('./index.html', pageHTML, err =>{
//     if (err) throw err;
//     console.log('Portfolio complete! Check out index.html to see the output!');
// });


// ASSIGNMENT DECONSTRUCTION
// this is an assignment deconstruction. It assigns a variable name to a index of an array
// const [userName, github] = profileDataArgs;


// GETTING USER DATA
// slice is added to skip the part of the array that would return Node.js' and this app's relative paths
// process.argv.length allows us to right as many argv values as we want
// const profileDataArgs = process.argv.slice(2);

// EXAMPLE OF ARROW FUNCTION
// const printProfileData = (profileDataArr) => {
//     profileDataArr.forEach((profileItem) => console.log(profileItem));
// }

// printProfileData(profileDataArgs);