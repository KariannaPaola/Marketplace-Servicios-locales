import useVerifyFee from "../../hooks/admin/useVerifyFee";
import VerifyFee from "../../components/admin/VerifyFee";

export default function VerifyFeeAdminPage(){

const {fee, approve, reject}= useVerifyFee();

return (

<div>
    <VerifyFee
          fee={fee}
          approve={approve}
          reject={reject}
        />
  </div>

)
}

