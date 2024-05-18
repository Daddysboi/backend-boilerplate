import dotenv from "dotenv";
import { MailingListModel } from "./model";

dotenv.config();

const mailingList = async (req, res) => {
  let { email } = req.body;
  try {
    const fetchedUser = await MailingListModel.find({ email });
    if (fetchedUser?.length) {
      return res.json({
        message: "User is already subscribed to the mailing list",
        status: 401,
      });
    }

    const subscriber = new MailingListModel({
      email: email,
      createdAt: Date.now(),
    });

    await subscriber.save();

    res.json({
      message: "User subscribed to the mailing list successfully",
      status: 201,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Something went wrong while adding user to the mailing list",
      status: 500,
    });
  }
};

export { mailingList };
