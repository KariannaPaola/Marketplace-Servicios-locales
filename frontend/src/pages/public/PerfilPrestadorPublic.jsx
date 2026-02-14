import ProfileProviderClientPublic from "../../components/public/ProfileProviderClientPublic";
import useProfileProviderClient from "../../hooks/clients/useProfileProviderClient"

export default function ProfileProviderPagePublic(){

const {profileProvider}=useProfileProviderClient();

return(
  <div>
  <ProfileProviderClientPublic
    profileProvider={profileProvider}
  />
  </div>
)

}