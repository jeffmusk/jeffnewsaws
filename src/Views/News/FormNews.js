import React from "react";

export default function FormNews(props) {
  const {
    formState,
    onChange,
    submit,
    typeForm,
    selectImage,
    cancel,
    selectedFile,
  } = props;

  return (
    <div
      className=" overflow-hidden flex items-center justify-center pb-5 "
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
              <option value="tecnologia">tecnología</option>
              <option value="deporte">deporte</option>
              <option value="farandula">farándula</option>
              <option value="politica">política</option>
            </select>
          </div>
          {/* col-span-2 lg:col-span-2 */}
          <div className="col-span-2 lg:col-span-2 grid">
            <div className="grid grid-cols-5 gap-2">
              <img
                src={selectedFile ? selectedFile : formState.imgUrl}
                alt="Sin imagen"
                className="col-span-3 max-h-40 rounded shadow-lg"
              />

              <div className=" col-span-2 flex w-full items-center justify-center bg-grey-lighter">
                <label className=" flex flex-col items-center px-2 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-500">
                  <svg
                    className="w-8 h-8 "
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal">
                    Seleccione una Imagen
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      selectImage(e);
                    }}
                  />
                </label>
              </div>
            </div>
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
                className="py-3 px-6 bg-green-500 text-white font-bold w-full  rounded-xl shadow-lg "
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
