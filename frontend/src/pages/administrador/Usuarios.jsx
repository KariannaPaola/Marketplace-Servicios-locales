import UsersList from "../../components/admin/UsersList"
import useUsersList from "../../hooks/admin/useUsersList"


export default function UsersAdminPage() {
  const {
    users ,page, setPage, total, limit, remove, unDelete}=useUsersList()

  return (
  <UsersList
    users={users}
    remove ={remove}
    unDelete={unDelete }
    page={page}
    setPage={setPage}
    total={total}
    limit={limit}
  />
  )
}

