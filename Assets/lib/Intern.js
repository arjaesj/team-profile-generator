// Create Intern sub-class.

const Employee = require("./Employee");

class Intern extends Employee {
    // Intern sub-class inherits Employee class with an additional parameter called "school"
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    // method that prints Intern role's school
    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }
}

// Export Intern sub-class
module.exports = Intern;