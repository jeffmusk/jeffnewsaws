import React, { useEffect } from "react";
import saveIcon from "../../Assets/save.svg";

export default function NewsCard(props) {
  const { data, user, saveNews } = props;

  return (
    <div className="p-8 bg-white">
      <img
        className="rounded-lg w-full"
        src={
          data.multimedia.length === 0
            ? "https://www.freeiconspng.com/uploads/no-image-icon-13.png"
            : `https://www.nytimes.com/${data.multimedia[0]?.url}`
        }
        alt="Imagen no encontrada"
      />
      <p className="text-indigo-500 font-semibold text-base mt-2 inline">
        {data.source}
      </p>

      <h1 className="font-semibold text-gray-900 leading-none text-xl mt-1 capitalize ">
        {data.abstract}
      </h1>
      <div className="max-w-full">
        <p className="text-base font-medium tracking-wide text-gray-600 mt-1 overflow-clip">
          {data.lead_paragraph}
        </p>
      </div>
      <div className="flex items-center space-x-1 mt-5 space-x-2  ">
        <div>
          <p className="text-gray-500 font-semibold text-sm inline-block ">
            {data.pub_date}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-1 mt-5 grid-cols-2 space-x-2">
        {user && (
          <img
            className="  inline-block pr-3"
            style={{ cursor: "pointer" }}
            src={saveIcon}
            alt="guardar"
            onClick={() => {
              saveNews(data);
            }}
          />
        )}

        <a
          href={data.web_url}
          target="_blank"
          className="py-2 px-4 bg-blue-500 text-white font-bold w-full text-center rounded-xl shadow-lg inline-block "
        >
          Leer Mas tarde
        </a>
      </div>
    </div>
  );
}
