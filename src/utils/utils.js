import bcrypt from "bcrypt";

const generateOtp = async () => {
  /** otp */
  const min = 90000;
  const max = 10000;

  const otp = Math.floor(Math.random() * min + max);

  const currentTime = new Date();
  const newTime = new Date(currentTime.getTime() + 15 * 60000); // 20 minutes in milliseconds

  return await {
    otp,
    newTime,
  };
};

const hashedData = async (data, saltRounds = 10) => {
  try {
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData;
  } catch (error) {
    throw error;
  }
};

const verifyHashedData = async (unhashed, hashed) => {
  try {
    const match = await bcrypt.compare(unhashed, hashed);
    return match;
  } catch (error) {
    throw error;
  }
};

export { hashedData, verifyHashedData, generateOtp };
