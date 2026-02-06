import useChangePassword from "../../hooks/auth/useChangePassword";
import ChangePassword from "../../components/auth/ChangePassword";

export default function ChangePasswordPage(){
  const {password, setPassword,newPassword_repeat, setNewPassword_repeat ,change} = useChangePassword();
 

return(
 <ChangePassword
    password={password}
    setPassword ={setPassword}
    newPassword_repeat={newPassword_repeat}
    setNewPassword_repeat={setNewPassword_repeat}
    change={change}
    
  />
)

}