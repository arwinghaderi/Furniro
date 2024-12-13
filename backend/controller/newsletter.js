const { errorResponse, successResponse } = require("../helper/responses");
const newsLetterModel = require("./../model/newsLetter");

exports.addToNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    const isExistEmail = await newsLetterModel.findOne({ email });
    if (isExistEmail) {
      return errorResponse(res, 403, {
        message: "Email has Already Exist in NewsLetter lists",
      });
    }

    const newsLetter = await newsLetterModel.create({
      email,
    });

    return successResponse(res, 201, {
      message: "Email add to NewsLetter lists",
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllNewsletters = async (req, res, next) => {
  try {
    const newsLetters = await newsLetterModel.find({}).lean();
    return successResponse(res, 200, { newsLetters });
  } catch (err) {
    next(err);
  }
};
