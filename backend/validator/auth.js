const yup = require("yup");

let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

exports.registerValidator = yup.object({
  fullname: yup
    .string()
    .min(5, "The name must have at least 5 characters")
    .max(100, "The name must have a maximum of 100 characters")
    .required(),
  email: yup
    .string()
    .matches(emailRegex, "The email entered is not valid.")
    .required(),
  password: yup
    .string()
    .required()
    .matches(
      passwordRegex,
      "The password must contain at least one capital letter, one number, one special character and at least 8 characters"
    ),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "The Password does not match with Confirm Password"
    )
    .required(),
});

exports.loginValidator = yup.object({
  email: yup
    .string()
    .matches(emailRegex, "The email entered is not valid.")
    .required(),
  password: yup
    .string()
    .required()
    .matches(
      passwordRegex,
      "The password must contain at least one capital letter, one number, one special character and at least 8 characters"
    ),
});
