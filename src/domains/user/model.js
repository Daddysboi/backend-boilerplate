import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["client", "admin"],
    default: "client",
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // allows for this field to be unique but also nullable
  },
  walletDetails: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    default: null,
  },
  otp: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  bvn: {
    type: String,
  },
  identificationDetails: {
    idType: { type: String },
    idNumber: { type: String },
    idCard: { type: String },
  },
  headShot: { type: String },
  contactDetails: {
    homeAddress: { type: String },
    nearestLandmark: { type: String },
    officeAddress: { type: String },
    deliveryAddress: { type: String },
    postalCode: { type: String },
    proofOfAddress: { type: String },
  },
  accountDetails: {
    bankName: { type: String },
    accountNumber: { type: String },
    accountName: { type: String },
  },
  nextOfKin: {
    fullName: { type: String },
    relationship: { type: String },
    contactNumber: { type: String },
  },
  isVerified: { type: Boolean },
  createAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdateAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel };
