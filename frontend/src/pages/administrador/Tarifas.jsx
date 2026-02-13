import useFeesAdmin from "../../hooks/admin/useFeesAdmin";
import FeesList from "../../components/admin/FeesList";

export default function FeesAdminPage(){
  const {fees, page, setPage, limit, total,approve, reject, feeApi, loading} = useFeesAdmin()

  return (
    <div >
      <FeesList
        loading={loading}
        feeApi={feeApi}
        fees={fees}
        page={page}
        limit={limit}
        total={total}
        approve={approve}
        reject={reject} 
        setPage={setPage}
      />
    </div>
  )
}
