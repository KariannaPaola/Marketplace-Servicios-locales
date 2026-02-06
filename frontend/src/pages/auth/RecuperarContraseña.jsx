import useRecoverPassword from "../../hooks/auth/useRecoverPassword";
import RecoverPassword from "../../components/auth/RecoverPassword";

export default function RecoverPasswordPage(){
  const {email,setEmail,handleRecoverPassword, setError, error, message} = useRecoverPassword();

return(
  <RecoverPassword
    email={email}
    setEmail ={setEmail}
    handleRecoverPassword={handleRecoverPassword}
    error={error}
    message={message}
    setError={setError}
  />
)

}