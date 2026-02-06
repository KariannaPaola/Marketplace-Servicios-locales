import { useState, useEffect } from "react";
import { myProfileProvider, editProfileProvider, categoriesPublic, getStates } from "../../services/auth";

export default function useEditProfileProvider() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, categoriesData, statesData] = await Promise.all([
          myProfileProvider(),
          categoriesPublic(),
          getStates()
        ]);

        setProfile({
          ...profileData,
          categories: profileData.categories?._id || profileData.categories?.toString() || "",
          state: profileData.state?._id || profileData.state?.toString() || "",
          services_offered: profileData.services_offered || []
        });

        setCategoriesList(categoriesData.categories || []);
        setStatesList(statesData.states || []);
        
      } catch (error) {
        console.error("Error cargando perfil o listas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const editProfile = async (data) => {
    try {
      const response = await editProfileProvider(data);
      setProfile(response.profile);
      setIsEditing(false);
      return response;
    } catch (error) {
      console.error("Error al editar perfil:", error);
      throw error;
    }
  };

  return {
    profile,
    loading,
    isEditing,
    startEdit: () => setIsEditing(true),
    cancelEdit: () => setIsEditing(false),
    editProfile,
    categoriesList,
    statesList
  };
}