import useMyFeesProvider from "../../hooks/providers/useMyfeesAdmin"
import MyFeesProvider from "../../components/providers/MyFeesProvider"

export default function MyFeesPage(){
  const {fees,page, setPage, total, limit}=useMyFeesProvider()

  return (
  <MyFeesProvider
    fees={fees}
    page={page}
    setPage={setPage}
    total={total}
    limit={limit}
  />
  )
}