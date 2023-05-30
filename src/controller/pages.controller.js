import { navigationLink } from "../validators/user.validator";

export const navigationController = async (req, res) => {
  const { error } = navigationLink(req.body);
  if (!error) {
    const { page } = req.body;
    res.redirect(`/api/clearly/page/${page}`);
  } else {
    res.status(422).json({
      success: false,
      message: error,
      data: {},
    });
  }
};
