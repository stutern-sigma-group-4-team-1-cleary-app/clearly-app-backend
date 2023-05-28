import bcrypt from "bcrypt";

const saltRounds = Number(config.bcrypt_salt_round);

const userPassword = async (password) => {
  const passwordValue = await bcrypt.hash(password, saltRounds);
  return passwordValue;
};


export {
    userPassword
}