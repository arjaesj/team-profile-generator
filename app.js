const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


const myTeamArray = []; //empty array for the user's team, members will be pushed when the user finished asnwering the inquirer prompts

function myTeamPrompts() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Please type in your complete name.",
          //validation function so the user will have to input a valid string for the name
          validate: (response) => {
            if (response !== "") {
              return true;
            } else {
              return "Please type in a valid input characters.";
            }
          },
        },
        {
          type: "input",
          name: "id",
          message: "Please type in your employee ID.",
          //validation function so the user will have to input a valid number for the ID 
          validate: (response) => {
            
            // arjae: from stackoverflow
            const responseValidNumber = response.match(/\d+g/);
            
            // const valid = response.match(/^[1-9]\d*$/); 
            if (responseValidNumber) {
              return true;
            } else {
              return "Please enter a valid number value from 0-9.";
            }
          },
        },
        {
          type: "input",
          name: "email",
          message: "Please type in your email address.",
          //validation function so the user will have to input a valid string for the email address
          validate: (response) => {
            if (response !== "") {
              return true;
            } else {
              return "Please type in a valid input characters.";
            }
          },
        },
        {
          type: "input",
          name: "officeNumber",
          message: "Please type in your work phone number.",
          //validation function so the user will have to input a valid number for the work phone number
          validate: (response) => {

            // arjae: from stackoverflow
            const responseValidNumber = response.match(/\d+g/);

            // const valid = response.match(/^[1-9]\d*$/);
            if (valid) {
              return true;
            } else {
              return "Please enter a valid number value from 0-9.";
            }
          },
        },
      ])
      //promise handled/fulfilled with instantiating a new Employee called Manager with the inputs from the inquirer prompts above.
      .then((answer) => {
        const manager = new Manager(
          answer.name,
          answer.id,
          answer.email,
          answer.officeNumber
        );
        // data fromt the user input to be pushed to the myTeamArray array
        teamArr.push(manager);
        chooseTeam();
      })
      .catch((err) => {
        throw err;
      });
  }
  // promp the manager to choose their team, picking from either engineer, or intern, also a choice to end adding employees.
  function chooseTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "userchoice",
          message: "Which role would you like to add to your team?",
          choices: [
            "Engineer",
            "Intern",
            "I do not want to add anyone else to my team",
          ],
        },
      ])
      .then(({ userchoice }) => {
        switch (userchoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            createTeam();
        }
      })
      .catch((err) => {
        throw err;
      });
  }
  // funciton for adding the software engineers
  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Please provide your Engineer's name",
          validate: (response) => {
            if (response !== "") {
              return true;
            } else {
              return "please enter a valid charater input";
            }
          },
        },
        {
          type: "input",
          name: "id",
          message: "Please provide your Engineer's employee ID",
          validate: (response) => {
            const valid = response.match(/^[1-9]\d*$/);
            if (valid) {
              return true;
            } else {
              return "You must endter a number between 1-10";
            }
          },
        },
        {
          type: "input",
          name: "email",
          message: "Please provide your Engineer's email",
          validate: (response) => {
            if (response !== "") {
              return true;
            } else {
              return "please enter a valid charater input";
            }
          },
        },
        {
          type: "input",
          name: "github",
          message: "Please Enter Your Engineer's GitHub Username:",
          validate: (response) => {
            if (response !== "") {
              return true;
            } else {
              return "please enter a valid charater input";
            }
          },
        },
      ])
      .then((answer) => {
        const engineer = new Engineer(
          answer.name,
          answer.id,
          answer.email,
          answer.github
        );
        teamArr.push(engineer);
        chooseTeam();
      })
      .catch((err) => {
        throw err;
      });
  }
  // funciton for adding interns
  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Please provide Intern's your name",
          validate: (response) => {
            if (response !== "") {
              return true;
            } else {
              return "please enter a valid charater input";
            }
          },
        },
        {
          type: "input",
          name: "id",
          message: "Please provide your Intern's employee ID",
          validate: (response) => {
            const valid = response.match(/^[1-9]\d*$/);
            if (valid) {
              return true;
            } else {
              return "You must endter a number between 1-10";
            }
          },
        },
        {
          type: "input",
          name: "email",
          message: "Please provide Intern's your email",
          validate: (response) => {
            if (response !== "") {
              return true;
            } else {
              return "please enter a valid charater input";
            }
          },
        },
        {
          type: "input",
          name: "school",
          message: "Please Enter the name of your Intern's School:",
          validate: (response) => {
            if (response !== "") {
              return true;
            } else {
              return "please enter a valid charater input";
            }
          },
        },
      ])
      .then((answer) => {
        const intern = new Intern(
          answer.name,
          answer.id,
          answer.email,
          answer.school
        );
        teamArr.push(intern);
        chooseTeam();
      })
      .catch((err) => {
        throw err;
      });
  }


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
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
