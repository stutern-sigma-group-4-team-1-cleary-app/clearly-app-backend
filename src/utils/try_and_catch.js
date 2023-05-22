const tryCatch = (func) => {
  return async (req, res, next) => {
    await func(req, res, next).catch((err) => {
      next(err);
    });
  };
};

export {
  tryCatch,
};
