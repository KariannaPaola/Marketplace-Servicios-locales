import CategoriesList from "../../components/admin/CategoriesList";
import CategoryForm from "../../components/admin/CategoriesForm";
import useCategoriesAdmin from "../../hooks/admin/useCategoriesAdmin"

export default function CategoriesAdminPage() {
  const {name, setName,description, categories, setDescription, create, creatingCategory, editingCategory, setEditingCategory, edit, remove, editStart}= useCategoriesAdmin();

  return(
    <div>
      <CategoryForm
        name={name}
        setName={setName}
        description={description}  
        setDescription={setDescription}
        creatingCategory ={creatingCategory} 
        editingCategory ={editingCategory}
        setEditingCategory={setEditingCategory}
        edit={edit} 
        create={create}
      />
      <CategoriesList
        categories={categories}
        remove={remove}
        editStart={editStart} 
      />
    </div>
  )
}


