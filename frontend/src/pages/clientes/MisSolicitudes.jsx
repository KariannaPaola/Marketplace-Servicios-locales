import useMyRequestClient from "../../hooks/clients/useMyRequestClient"
import MyRequestClient from "../../components/Clients/MyRequestClient"

export default function MyRequestClientPage(){
  
  const {requests,confirm, cancel,page, setPage, total, limit}=useMyRequestClient()
return (

<MyRequestClient
        requests={requests}
        confirm ={confirm}
       cancel={cancel}
        page={page}
        setPage={setPage}
        total={total}
        limit={limit}
        />

)
}