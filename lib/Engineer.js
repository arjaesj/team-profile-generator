// Create Engineer sub-class.

const Employee = require("./Employee");

class Engineer extends Employee {
    // Engineer sub-class inherits Employee class with an additional parameter called "github"
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    // method that prints Engineer role's github username that links to github page
    getGithub(){
        return this.github;
    }

    getRole(){
        return "Engineer";
    }
}

// Export Engineer sub-class
module.exports = Engineer;
