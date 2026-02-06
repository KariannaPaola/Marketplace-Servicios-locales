import useMyProfileProvider from "../../hooks/providers/useMyProfileProvider"
import MyProfileProvider from "../../components/providers/MyProfileProvider"
import EditMyProfileProvider from "../../components/providers/EditMyProfileProvider";


export default function MyProfileProviderPage( ){
 const {profile,loading,isEditing,startEdit,cancelEdit,editProfile, categoriesList, statesList}=useMyProfileProvider()


if (loading) return <p>Cargando...</p>;

return isEditing ? (
    <EditMyProfileProvider
      profile={profile}
      categoriesList={categoriesList}
      statesList={statesList}
      onSave={editProfile}
      onCancel={cancelEdit}
    />
  ) : (
    <MyProfileProvider
      profile={profile}
      onEdit={startEdit}
    />
  );

}