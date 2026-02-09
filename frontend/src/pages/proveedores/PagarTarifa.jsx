import usePayFeeProvider from "../../hooks/providers/usePayMyFeeProvider"
import PayMyFeeProvider from "../../components/providers/PayMyFeeProvider"


export default function PayFeePage(){
  const {payMyFee, reference, setreference,error}=usePayFeeProvider()
return (
  <PayMyFeeProvider
    payMyFee={payMyFee}
    reference={reference}
    setreference={setreference}
    error={error}
  />
)

}