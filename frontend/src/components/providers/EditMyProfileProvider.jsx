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

  if (!categoriesList || !statesList) {
    return <p className="text-center text-gray-500">Cargando listas...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-xl font-semibold text-gray-900 text-center">
          Editar perfil
        </h1>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Profesión
          </label>
          <input
            name="profession"
            value={form.profession}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Categoría
          </label>
          <select
            name="categories"
            value={form.categories}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">--Seleccione una categoría--</option>
            {categoriesList.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">--Seleccione un estado--</option>
            {statesList.map(st => (
              <option key={st._id} value={st._id}>
                {st.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
            Servicios ofrecidos
          </h3>
          {form.services_offered.map((s, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3">
              <input
                placeholder="Nombre del servicio"
                value={s.name_service}
                onChange={(e) =>
                  handleServiceChange(index, "name_service", e.target.value)
                }
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Precio"
                value={s.price}
                onChange={(e) =>
                  handleServiceChange(index, "price", e.target.value)
                }
                className="w-full sm:w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {form.services_offered.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="text-sm text-red-600 hover:underline">
                  Eliminar
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addService}
            className="text-sm font-medium text-blue-600 hover:underline">
            + Agregar servicio
          </button>
        </div>
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl">
            Guardar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-gray-300 hover:bg-gray-100 transition font-semibold py-3 rounded-xl">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}