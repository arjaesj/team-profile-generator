// Create Manager sub-class.

const Employee = require("./Employee");

class Manager extends Employee {
    // Manager sub-class inherits Employee class with an additional parameter called "github"
    constructor(name, id, email, officeNum) {
        super(name, id, email);
        this.officeNum = officeNum;
    }
    // method that prints Intern role's school
    getOfficeNumber(){
        return this.github;
    }

    getRole(){
        return "Manager";
    }
}

// Export Intern sub-class
module.exports = Manager;
