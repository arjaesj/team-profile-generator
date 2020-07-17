// Create Manager sub-class.

const Employee = require("./Employee");

class Manager extends Employee {
    // Manager sub-class inherits Employee class with an additional parameter called "officeNumber"
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    // method that prints Manager's office number
    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return "Manager";
    }
}

// Export Intern sub-class
module.exports = Manager;