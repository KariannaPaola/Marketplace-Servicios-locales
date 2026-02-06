import useProvidersAdmin from "../../hooks/admin/useProvidersAdmin";
import ProvidersList from "../../components/admin/ProvidersList";


export default function ProvidersAdminPage (){
  const {providers,page, setPage, total, limit, approve, rejected}=useProvidersAdmin()
  
  return(
    <ProvidersList
        providers={providers}
        page={page}
        limit={limit}
        total={total}
        approve={approve}
        rejected={rejected} 
        setPage={setPage}
      />
  )
}
