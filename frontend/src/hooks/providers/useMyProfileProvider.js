import { useState, useEffect } from "react";
import { myProfileProvider } from "../../services/auth";
import { editProfileProvider } from "../../services/auth";
import {categoriesPublic, getStates} from "../../services/auth";

export default function useMyProfileProvider ()  {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [statesList, setStatesList] = useState([]);

  useEffect (()=>{
    const getMyProfileProvider= async()=>{
      try {
        const [profileData, categories, states]= await Promise.all([
          myProfileProvider(),
          categoriesPublic(),
          getStates()
        ]);;
        setProfile({
          ...profileData,
          categories: profileData.categories ? profileData.categories.toString() : "",
          state: profileData.state ? profileData.state.toString() : ""
        });
        setCategoriesList(categories.categories || []); 
        setStatesList(states.states || []);  
      } catch (error) {
        console.log (error, "Error al mostrar perfil")
      }finally {
          setLoading(false);
      }
    }
    getMyProfileProvider()
  },[])

  const editProfile = async (data) => {
    const response = await editProfileProvider(data);
    setProfile(response.profile);
    setIsEditing(false);
  }
  
  return {profile, loading, isEditing, 
    startEdit: () => setIsEditing(true), 
    cancelEdit: () => setIsEditing(false),
    editProfile, editProfile,
    categoriesList,
    statesList};
};