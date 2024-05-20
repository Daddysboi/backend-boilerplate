const redirect = async (req, res) => {
  const { userId } = req.user;
  res.redirect(`/getUserById/:${userId}`);
};

export { redirect };
