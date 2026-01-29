import bcrypt from "bcryptjs";

export async function bycrytMiddleware(next){
  const user = this;
  if (!user.isModified("password")) 
    return 
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (error) {
    return error;
  }
}