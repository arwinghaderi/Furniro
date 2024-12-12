const yup = require("yup");

let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

exports.addToNewsletterValidator = yup.object({
  email: yup
    .string()
    .matches(emailRegex, "The email entered is not valid.")
    .required(),
});
