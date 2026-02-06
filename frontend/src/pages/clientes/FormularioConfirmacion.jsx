import FormRequestClient from "../../components/Clients/FormRequestClient";
import useFormRequestClient from "../../hooks/clients/useFormRequestClient";


export default function FormRequestPage (){
  const { handleSubmitForm, name_service,setName_service, date ,setDate, description, setDescription } = useFormRequestClient();

  return(
    <FormRequestClient
      handleSubmitForm={handleSubmitForm}
      name_service ={name_service}
      setName_service={setName_service}
      date={date}
      setDate={setDate}
      description={description}
      setDescription={setDescription}
    />
  )
}