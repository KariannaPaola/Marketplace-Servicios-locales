import CategoriesPublic from "../../components/public/CategoriesPublic";
import FeatureHighlights from "../../components/public/FeatureHighlights";
import UseCategoriesPublic from "../../hooks/public/useCategoriesPublic";
import GetProvidersPublic from "../../components/public/GetProvidersPublic";
import UseGetProvidersPublic from "../../hooks/public/useGetProvidersPublic";



export default function Home() {
const {categories}=UseCategoriesPublic()
const {providers}=UseGetProvidersPublic()


  return( 
  <div>
    <GetProvidersPublic
      providers={providers}
    />
    <CategoriesPublic
      categories={categories}
    />
    <FeatureHighlights/>
  </div>
  )
}