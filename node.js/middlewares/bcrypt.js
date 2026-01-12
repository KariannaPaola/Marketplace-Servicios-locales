import bcrypt from "bcrypt";

export async function bycrytMiddleware(){
  const user = this;

  if (!user.isModified("password")) 
    return;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    
  } catch (error) {
    throw error;
  }

}