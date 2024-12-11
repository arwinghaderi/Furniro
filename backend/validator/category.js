const yup = require("yup");

exports.createCategoryValidator = yup.object({
  title: yup
    .string()
    .required()
    .min(3, "title must be 3 min Chracter")
    .max(24, "title must be 24 maximum Chracter"),

  href: yup
    .string()
    .required()
    .min(3, "href must be 3 min Chracter")
    .max(24, "href must be 24 maximum Chracter"),
});
