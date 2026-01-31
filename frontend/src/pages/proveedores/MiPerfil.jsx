import { useEffect } from "react"
import { useState } from "react"
import { readMyProfileProvider } from "../../services/auth"


export default function MyProfileProvider( ){
  const [profile, setProfile]=useState({})
  
    useEffect(()=>{
    const myProfile=async () => {
      try {
        const data= await readMyProfileProvider()
        setProfile(data)
        console.log(data)
      } catch (error) { 
      }

    }
    
    myProfile()
    },[])







return(
  <div>
<h1>Mi perfil</h1>

<p>{profile.profession}</p>

  </div>
)

}