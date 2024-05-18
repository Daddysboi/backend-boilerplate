export const error404Handler = async (req, res, next) => {
  let err = new Error();
  res.json({
    status: 404,
    message: "The resource you are looking for does not exit",
  });
};
