// npm
const inquirer = require('inquirer');
// core
// fs stands for "file system", a Node module that can create multiple file types, including TXT, PDF, HTML & JSON
// require is a built in global function of Node that allows this script to access the fs module functions
const fs = require('fs');

// personal
const generatePage = require('./src/page-template.js');
// This is object deconstruction. Instead of using generateSite.writeFile, we're now able to just write writeFile
const {writeFile, copyFile} = require('./utils/generate-site.js');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username. (Required)',
            validate: gitHubInput => {
                if (gitHubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub Username.');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: false
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself.',
            when: ({confirmAbout}) => confirmAbout
        }
    ]);
        
}

const promptProject = portfolioData => {
    // If there's no 'project' array property, create one
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
            message: 'What is the name of your project?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('You need to enter a project name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project. (Required)',
            validate: descriptionInput => {
                if (descriptionInput){
                    return true;
                } else {
                    console.log('Please enter some information about your project.');
                    return false;
                }
            }
        },
        { // No/all choices are both valid entries with 'checkbox'
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node.js'],
            validate: languagesInput => {
                if (languagesInput) {
                    return true;
                } else {
                    console.log('You need to enter languages you used.')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project (Required)',
            validate: linkedInput => {
                if (linkedInput){
                    return true;
                }else{
                    console.log('Please enter your GitHub project link.');
                    return false;
                }
            }
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
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .then(err => {
        console.log(err);
    });

// const pageHTML = generatePage(portfolioData);
//         // The arguments required for fs.writeFile: file name/type, the data that will be written onto the file, a callback function used for error handling
//     fs.writeFile('./dist/index.html', pageHTML, err =>{
//         if (err) throw new Error (err);
//         console.log('Portfolio complete! Check out index.html to see the output!');

//         fs.copyFile('./src/style.css', './dist/style.css', err => {
//             if (err) {
//                 console.log(err);
//                 return;
//             }
//             console.log ('Style sheer copied successfully.');
//         });
//     });