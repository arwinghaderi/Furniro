const { successResponse } = require("../helper/responses");
const concatModel = require("./../model/contact");

exports.createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    await concatModel.create({
      name,
      email,
      subject,
      message,
    });
    return successResponse(res, 201, {
      message: "Your Concat Message Sent",
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllContact = async (req, res, next) => {
  try {
    const concats = await concatModel.find({}).lean();

    return successResponse(res, 200, { concats });
  } catch (err) {
    next(err);
  }
};
