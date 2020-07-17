const Manager = require("./Assets/lib/Manager");
const Engineer = require("./Assets/lib/Engineer");
const Intern = require("./Assets/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./Assets/lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


const myTeamArray = []; //empty array for the usecr's team, members will be pushed when the user finished asnwering the inquirer prompts

function myTeamPrompts() {
    console.log("Welcome to Coding Team Profile Generator! Please answer the prompt correctly to build your coding dream team.")
    inquirer
        .prompt([{
                type: "input",
                name: "name",
                message: "Please type in your complete name.",
                //validation function so the user will have to input a valid string for the name
                validate: (response) => {
                    if (response !== "") {
                        return true;
                    } else {
                        return "Please type in valid input characters.";
                    }
                },
            },
            {
                type: "input",
                name: "id",
                message: "Please type in your employee ID.",
                //validation function so the user will have to input a valid number/s for the ID 
                validate: (response) => {

                    //create variable to store response that should match with full numeric strings 
                    const responseValidNumber = response.match(/\d+$/);
                    if (responseValidNumber) {
                        return true;
                    } else {
                        return "Please enter valid number values from 0-9.";
                    }
                },
            },
            {
                type: "input",
                name: "email",
                message: "Please type in your email address.",
                //validation function so the user will have to input a valid string for the email address
                validate: (response) => {

                    //create variable to store response that should match with eamil address RegEx 
                    const responseValidEmail = response.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
                    if (responseValidEmail) {
                        return true;
                    } else {
                        return "Please type in a valid email address.";
                    }
                },
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Please type in your work phone number.",
                //validation function so the user will have to input a valid numbers for the work phone number
                validate: (response) => {

                    //create variable to store response that should match with full numeric strings 
                    const responseValidNumber = response.match(/\d+$/);
                    if (responseValidNumber) {
                        return true;
                    } else {
                        return "Please enter valid number values from 0-9.";
                    }
                },
            },
        ])
        //promise handled/fulfilled and instantiating a new Employee called Manager with the inputs from the inquirer prompts above.
        .then((answer) => {
            const manager = new Manager(
                answer.name,
                answer.id,
                answer.email,
                answer.officeNumber
            );
            // data from the user input to be pushed to the myTeamArray variable
            myTeamArray.push(manager);
            // Employee type selection function prompt will then be invoked
            employeeType();
        })
        .catch((err) => {
            throw err;
        });
}
//Function for Employee type selection that gives the user a choice of roles an employee will have or to exit the prompts.
function employeeType() {
    inquirer
        .prompt([{
            type: "list",
            name: "employeeRole",
            message: "Choose your new employee's role in your team.",
            choices: [
                "Engineer",
                "Intern",
                "Exit",
            ],
        }, ])
        //promise handled/fulfilled and starting a switch function to determine the type of employee/s to be added in the team.
        .then(({ employeeRole }) => {
            switch (employeeRole) {
                case "Engineer":
                    createEngineerCard();
                    break;
                case "Intern":
                    createInternCard();
                    break;
                default:
                    console.log("HTML Generated! Refer to 'output' folder.")
                    generateTeamHtml();
            }
        })
        .catch((err) => {
            throw err;
        });
}
// funciton for adding the software engineers
function createEngineerCard() {
    inquirer
        .prompt([{
                type: "input",
                name: "name",
                message: "Please type in your new Engineer's name",
                //validation function so the user will have to input a valid string for the name
                validate: (response) => {
                    if (response !== "") {
                        return true;
                    } else {
                        return "Please type in valid input characters.";
                    }
                },
            },
            {
                type: "input",
                name: "id",
                message: "Please type in your new Engineer's employee ID.",
                //validation function so the user will have to input a valid number for the ID 
                validate: (response) => {

                    //create variable to store response that should match with full numeric strings 
                    const responseValidNumber = response.match(/\d+$/);
                    if (responseValidNumber) {
                        return true;
                    } else {
                        return "Please enter valid number values from 0-9.";
                    }
                },
            },
            {
                type: "input",
                name: "email",
                message: "Please type in your new Engineer's email address.",
                //validation function so the user will have to input a valid string for the email address
                validate: (response) => {

                    //create variable to store response that should match with eamil address RegEx 
                    const responseValidEmail = response.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
                    if (responseValidEmail) {
                        return true;
                    } else {
                        return "Please type in a valid email address.";
                    }
                },
            },
            {
                type: "input",
                name: "github",
                message: "Please type in you new Engineer's GitHub username:",
                //validation function so the user will have to input a valid string for the github username
                validate: (response) => {
                    if (response !== "") {
                        return true;
                    } else {
                        return "Please type in valid input characters.";
                    }
                },
            },
        ])
        //promise handled/fulfilled and instantiating a new Employee called Engineer with the inputs from the inquirer prompts above.
        .then((answer) => {
            const engineer = new Engineer(
                answer.name,
                answer.id,
                answer.email,
                answer.github
            );
            // data from the user input to be pushed to the myTeamArray array
            myTeamArray.push(engineer);
            // Employee type selection function prompt will then be invoked to restart Employee type selection
            employeeType();
        })
        .catch((err) => {
            throw err;
        });
}
// funciton for adding interns
function createInternCard() {
    inquirer
        .prompt([{
                type: "input",
                name: "name",
                message: "Please type in your new Intern's name",
                //validation function so the user will have to input a valid string for the name
                validate: (response) => {
                    if (response !== "") {
                        return true;
                    } else {
                        return "Please type in valid input characters.";
                    }
                },
            },
            {
                type: "input",
                name: "id",
                message: "Please type in your new Intern's employee ID.",
                //validation function so the user will have to input a valid number for the ID
                validate: (response) => {

                    //create variable to store response that should match with full numeric strings 
                    const responseValidNumber = response.match(/\d+$/);
                    if (responseValidNumber) {
                        return true;
                    } else {
                        return "Please enter valid number values from 0-9.";
                    }
                },
            },
            {
                type: "input",
                name: "email",
                message: "Please type in your new Intern's email address.",
                //validation function so the user will have to input a valid string for the email address
                validate: (response) => {

                    //create variable to store response that should match with eamil address RegEx 
                    const responseValidEmail = response.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
                    if (responseValidEmail) {
                        return true;
                    } else {
                        return "Please type in a valid email address.";
                    }
                },
            },
            {
                type: "input",
                name: "school",
                message: "Please type in the name of the school your Intern's went to.",
                //validation function so the user will have to input a valid string for the school name
                validate: (response) => {
                    if (response !== "") {
                        return true;
                    } else {
                        return "Please type in valid input characters.";
                    }
                },
            },
        ])
        //promise handled/fulfilled and instantiating a new Employee called Intern with the inputs from the inquirer prompts above.
        .then((answer) => {
            const intern = new Intern(
                answer.name,
                answer.id,
                answer.email,
                answer.school
            );
            // data from the user input to be pushed to the myTeamArray array
            myTeamArray.push(intern);
            // Employee type selection function prompt will then be invoked to restart Employee type selection
            employeeType();
        })
        .catch((err) => {
            throw err;
        });
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

function generateTeamHtml() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    // After you have your html, you're now ready to create an HTML file using the HTML
    // returned from the `render` function. Now write it to a file named `team.html` in the
    // `output` folder. You can use the variable `outputPath` above target this location.

    fs.writeFileSync(outputPath, render(myTeamArray), "utf-8");
}
// Initialize inquirer prompts
myTeamPrompts();


// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```