import useMyRequestsProvider from "../../hooks/providers/useMyRequestsProviders"
import MyRequestsProvider from "../../components/providers/MyRequestProvider"

export default function MyRequestProviderPage(){
  const {requests,confirm, cancel,page, setPage, total, limit}=useMyRequestsProvider()

  return (
    <MyRequestsProvider
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