const yup = require("yup");

exports.addToNewsletterValidator = yup.object({
  title: yup.string().min(5).max(35).required(),
  caption: yup.string().min(5).max(40).required(),
});
