const yup = require("yup");

let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

exports.createConcatSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at Least 3 Char")
    .max(55, "Name must be Max 55 Char")
    .required("Name is a required Field"),

  email: yup
    .string()
    .matches(emailRegex, "The email entered is not valid.")
    .required(),

  subject: yup.string().max(255, "Subject must be Max 255 Char").optional(),
  message: yup.string().max(3000, "Subject must be Max 3000 Char").required(),
});
