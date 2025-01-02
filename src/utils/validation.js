

const validator = require("validator");

const signupValidation = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    debugger;
    if (!validator.isEmail(emailId)) {
        throw new Error("Email ID is not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Paasword strength is not matching");
    }
    if (!firstName === "" || !lastName === "") {
        throw new Error("Entered first name or last name");
    }
}

module.exports = {
    signupValidation
}

