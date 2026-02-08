import CategoriesPublic from "../../components/public/CategoriesPublic";
import FeatureHighlights from "../../components/public/FeatureHighlights";
import UseCategoriesPublic from "../../hooks/public/useCategoriesPublic";

export default function Home() {
const {categories}=UseCategoriesPublic()

  return( 
  <div>

    <CategoriesPublic
    categories={categories}
    />
    
    <FeatureHighlights/>
  </div>
  )
}