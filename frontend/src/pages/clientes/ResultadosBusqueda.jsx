import GetProvidersSearch from "../../components/Clients/GetProvidersSearch"
import useGetProvidersSearchClient from "../../hooks/clients/useGetProvidersSearch"

export default function GetProvidersSearchPage(){
const {providers,page, setPage, total, limit,loading}=useGetProvidersSearchClient()



return (

<GetProvidersSearch
  providers={providers}
  page ={page}
  setPage ={setPage}
  total={total}
  limit={limit}
  loading={loading}
  />
)
}

