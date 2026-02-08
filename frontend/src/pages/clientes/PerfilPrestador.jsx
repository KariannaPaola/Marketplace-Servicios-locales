import ProfileProviderClient from "../../components/Clients/ProfileProviderClient"
import useProfileProviderClient from "../../hooks/clients/useProfileProviderClient"

export default function ProfileProviderPage(){

const {profileProvider}=useProfileProviderClient();

return(
  <div>
  <ProfileProviderClient
    profileProvider={profileProvider}
  />
  </div>
)

}

