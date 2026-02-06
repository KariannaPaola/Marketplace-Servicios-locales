import { useState, useEffect } from "react";

export default function EditMyProfileProvider({
  profile,
  categoriesList,
  statesList,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState({
    profession: profile.profession || "",
    description: profile.description || "",
    categories: profile.categories || "",
    state: profile.state || "",
    services_offered: profile.services_offered || []
  });
  useEffect(() => {
  console.log("categoriesList actualizado:", categoriesList);
}, [categoriesList]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (index, field, value) => {
    const updated = [...form.services_offered];
    updated[index][field] = value;
    setForm(prev => ({ ...prev, services_offered: updated }));
  };

  const addService = () => {
    setForm(prev => ({
      ...prev,
      services_offered: [...prev.services_offered, { name_service: "", price: "" }]
    }));
  };

  const removeService = (index) => {
    const updated = form.services_offered.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, services_offered: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!categoriesList || !statesList) return <p>Cargando listas...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editar perfil</h1>

      <label>
        Profesión
        <input
          name="profession"
          value={form.profession}
          onChange={handleChange}
        />
      </label>

      <label>
        Descripción
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Categoría
        <select
          name="categories"
          value={form.categories}
          onChange={handleChange}
        >
          <option value="">--Seleccione una categoría--</option>
          {categoriesList.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </label>

      <label>
        Estado
        <select
          name="state"
          value={form.state}
          onChange={handleChange}
        >
          <option value="">--Seleccione un estado--</option>
          {statesList.map(st => (
            <option key={st._id} value={st._id}>{st.name}</option>
          ))}
        </select>
      </label>

      <h3>Servicios ofrecidos</h3>
      {form.services_offered.map((s, index) => (
        <div key={index}>
          <input
            placeholder="Nombre del servicio"
            value={s.name_service}
            onChange={(e) => handleServiceChange(index, "name_service", e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio"
            value={s.price}
            onChange={(e) => handleServiceChange(index, "price", e.target.value)}
          />
          {form.services_offered.length > 1 && (
            <button type="button" onClick={() => removeService(index)}>Eliminar</button>
          )}
        </div>
      ))}
      <button type="button" onClick={addService}>Agregar Servicio</button>

      <div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}