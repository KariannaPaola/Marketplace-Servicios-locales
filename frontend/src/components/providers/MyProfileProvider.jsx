export default function MyProfileProvider ({profile, onEdit} ){

return(
<div >
  <h1>Mi perfil</h1>
  <p>{profile.profession}</p>

  <button onClick={onEdit}>
        Editar
      </button>
</div>
)
}