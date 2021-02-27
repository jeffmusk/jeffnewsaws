import React from "react";

export default function FormNews(props) {
  const { formState, onChange, submit, typeForm, cancel } = props;

  return (
    <div
      className="h-screen overflow-hidden flex items-center justify-center "
      style={{ background: "#edf2f7" }}
    >
      <div className="max-w-2xl bg-white py-6 px-2 m-auto w-full mt-7 shadow-lg rounded-md">
        <div className="text-3xl mb-6 text-center ">Crea una noticia</div>

        <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
          <div className="col-span-2 lg:col-span-1">
            <input
              type="text"
              className="border-solid border-gray-300 border-2 p-3 md:text-xl w-full rounded-xl shadow-md"
              placeholder="Titulo"
              name="title"
              onChange={onChange}
              value={formState.title}
            />
          </div>

          <div className="col-span-2 lg:col-span-1">
            <select
              className="border-solid border-gray-300 border-2 p-3 md:text-xl w-full rounded-xl shadow-md"
              defaultValue={formState.MetaData}
              name="MetaData"
              onClick={onChange}
            >
              <option value="default" disabled>
                Escoja una categoria
              </option>
              <option value="tecnologia">tecnologia</option>
              <option value="deporte">deporte</option>
              <option value="farandula">farandula</option>
              <option value="politica">politica</option>
            </select>
          </div>

          <div className="col-span-2 lg:col-span-2">
            <input
              type="text"
              className="border-solid border-gray-300 border-2 p-3 md:text-xl w-full rounded-xl shadow-md"
              placeholder="Url de imagen"
              name="imgUrl"
              onChange={onChange}
              value={formState.imgUrl}
            />
          </div>

          <div className="col-span-2">
            <textarea
              cols="30"
              rows="4"
              className="border-solid border-gray-300 border-2  p-1 md:text-xl w-full rounded-xl shadow-md"
              placeholder="Contenido"
              name="description"
              onChange={onChange}
              value={formState.description}
            ></textarea>
          </div>

          <div className="col-span-2 text-right">
            {typeForm === "create" && (
              <button
                className="py-3 px-6 bg-green-500 text-white font-bold w-full  rounded-xl shadow-lg"
                onClick={submit}
              >
                Crear Noticia
              </button>
            )}
            {typeForm === "edit" && (
              <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
                <button
                  className="py-3 px-6 bg-red-500 text-white font-bold w-full  rounded-xl shadow-lg"
                  onClick={cancel}
                >
                  Cancelar
                </button>
                <button
                  className="py-3 px-6 bg-green-500 text-white font-bold w-full  rounded-xl shadow-lg"
                  onClick={submit}
                >
                  Editar
                </button>
              </div>
            )}
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
}
