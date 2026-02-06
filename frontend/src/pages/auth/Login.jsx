import useLogin from "../../hooks/auth/useLogin";
import Login from "../../components/auth/Login";



export default function LoginPage() {

  const {email, setEmail,password, setPassword, handleSubmit,error, setError} = useLogin();

  return (
    <Login
      email={email}
      setEmail ={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      error={error}
      setError={setError}
      />
  );
}