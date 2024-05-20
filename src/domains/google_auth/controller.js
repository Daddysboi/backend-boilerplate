const redirect = async (req, res) => {
  console.log("hi");

  const { _id: userId } = req.user;
  res.redirect(`/api/v1/getUserById/${userId}`);
};

export { redirect };
