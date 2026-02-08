import useRegister from "../../hooks/auth/useRegister";
import Register from "../../components/auth/Register";

export default function RegisterPage() {
  const {name, lastname, email,setName, setLastname, setEmail,phone_number, setPhoneNumber, password, setPassword, password_repeat, setPasswordRepeat, handleSubmit, error, message} = useRegister();
  return (
    <Register
      name={name}
      lastname ={lastname}
      email={email}
      setName={setName}
      setLastname={setLastname}
      setEmail={setEmail}
      phone_number={phone_number}
      setPhoneNumber={setPhoneNumber}
      password={password}
      setPassword={setPassword}
      password_repeat={password_repeat}
      setPasswordRepeat={setPasswordRepeat}
      handleSubmit={handleSubmit}
      error={error}
      message={message}
    />
  );
}