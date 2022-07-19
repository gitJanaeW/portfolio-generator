// npm
const inquirer = require('inquirer');
// core
// fs stands for "file system", a Node module that can create multiple file types, including TXT, PDF, HTML & JSON
// require is a built in global function of Node that allows this script to access the fs module functions
// const fs = require('fs');
// personal

// Note that inquirer can recieve an array of prompts
const promptUser = () => {
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHUb Username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself'
        }
    ])
}
// What is portfolioData doing? Why can it just have an array attached to it?
const promptProject = portfolioData => {
    portfolioData.projects = portfolioData.projects || [];
    console.log(`
    =================
    Add a New Project
    =================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
        },
        { // No/all choces are both valid entries with 'checkbox'
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node.js']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project (Required)'
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ]).then(projectData => {
        // determines what will happen if user confirms that they want to add more projects
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

// Using .then here instead of in the functions themselves allows us to better control when the console.log is deployed
promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(`
        ==============
        Your Projects: 
        ==============
        ` + portfolioData);
    });






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