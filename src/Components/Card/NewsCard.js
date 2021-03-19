import React from "react";

export default function NewsCard(props) {
  const { data, user, saveNews, isEditCard } = props;

  const getDay = (data, isEditCard) => {
    if (isEditCard) {
      let dateGmt = new Date(data.createdAt);
      let day = dateGmt.getUTCDate();
      return day;
    } else {
      let time = new Date(data.pub_date);
      let day = time.getDate();
      return day;
    }
  };

  const getDateMounth = (data, isEditCard) => {
    let months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];

    if (isEditCard) {
      let dateGmt = new Date(data.createdAt);
      let mountNumber = dateGmt.getUTCMonth();
      return months[mountNumber];
    } else {
      let time = new Date(data.pub_date);
      let mountNumber = time.getMonth();

      return months[mountNumber];
    }
  };

  getDay(data, isEditCard);
  return (
    <div
      className=" max-w-xs  max-w-xs rounded
        overflow-hidden shadow-lg my-2 bg-white "
    >
      <div className="relative ">
        <div
          className="rounded-full bg-gray-800 w-14 h-14 flex flex-col items-center justify-center
             shadow-md absolute top-1.5 right-1.5 opacity-70 "
        >
          <h1 className="font-bold text-white border-b-2 border-white">
            {getDay(data, isEditCard)}
          </h1>
          <p className="text-white text-xs">
            {getDateMounth(data, isEditCard)}
          </p>
        </div>
        {isEditCard ? (
          <img className="w-full " src={data.imgUrl} alt="montaña" />
        ) : (
          <img
            className="w-full "
            src={
              data.multimedia.length === 0
                ? "https://www.freeiconspng.com/uploads/no-image-icon-13.png"
                : `https://www.nytimes.com/${data.multimedia[0]?.url}`
            }
            alt="montaña"
          />
        )}
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 ">
          {isEditCard ? data.title : data.headline.main}
        </div>
        <p className="text-grey-darker overflow-hidden text-sm text-justify">
          {isEditCard ? data.description : data.abstract}
        </p>
      </div>
      <div className="px-6 py-2 flex justify-between ">
        <a
          href={isEditCard ? data.url : data.web_url}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-500  hover:text-red-400 "
        >
          Leer Mas{" "}
        </a>
        {user && !isEditCard && (
          <button
            className="text-indigo-600  hover:text-red-400 "
            onClick={() => {
              saveNews(data);
            }}
          >
            Guardar
          </button>
        )}
      </div>
    </div>
  );
}
