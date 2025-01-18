const yup = require("yup");

let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

exports.checkoutValidator = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(3)
    .max(25)
    .required("First name is required"),
  lastName: yup
    .string()
    .trim()
    .min(3)
    .max(30)
    .required("Last name is required"),
  postallCode: yup.string().required("Postal code is required"),
  fullAddress: yup.string().max(700).required("Full address is required"),
  phone: yup
    .string()
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
    .required("Phone number is required"),
  email: yup
    .string()
    .matches(emailRegex, "The email entered is not valid.")
    .required("Email is required"),
});
