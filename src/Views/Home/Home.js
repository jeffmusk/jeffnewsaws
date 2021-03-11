import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../Contex/UserContext";
import SpinnerApp from "../../Components/Spinner/SpinnerApp";
import saveIcon from "../../Assets/save.svg";
import axios from "axios";
import { API } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import { toast } from "react-toastify";

const apiNyTimes = axios.create({
  baseURL: "https://api.nytimes.com/svc/search/v2/",
});

export default function Home() {
  const { user } = useCurrentUser();
  const apiKey = process.env.REACT_APP_API_KEY_NEWSAPI;
  const apiKeyMediastack = process.env.REACT_APP_API_KEY_NEWSAPI_MEDIASTACK;
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);

  const getNewsMediaStack = async () => {
    try {
      const res = await axios.get(
        `https://api.mediastack.com/v1/news?access_key=${apiKeyMediastack}&languages=es`
      );
      console.log(res.data);
      /* setArticles(res.data);
      setLoading(false); */
    } catch (error) {
      console.log(error);
      /*       setLoading(false); */
    }
  };

  async function saveNews(data) {
    let newNotice = {
      title: data.title,
      description: data.description,
      imgUrl: data.urlToImage,
      url: data.url,
      author: data.source.name,
    };

    try {
      await API.graphql({
        query: mutations.createNews,
        variables: {
          input: newNotice,
        },
      });
      toast.success("Noticia Guardada", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  }

  useEffect(() => {
    console.log("buscando noticias");
    getNewsMediaStack();
  }, []);

  return (
    <div>
      {loading ? (
        <SpinnerApp />
      ) : (
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 mt-5 px-5 bg-gray-100 py-2">
          {articles.data &&
            articles.data.map((data, i) => (
              <div className="p-8 bg-white" key={i}>
                <h1>{console.log(data.title)}</h1>
                <img
                  className="rounded-lg w-full"
                  src={
                    data.image == null
                      ? "https://www.freeiconspng.com/uploads/no-image-icon-13.png"
                      : data.image
                  }
                  alt="Imagen no encontrada"
                />
                <p className="text-indigo-500 font-semibold text-base mt-2 inline">
                  {data.author}
                </p>

                <h1 className="font-semibold text-gray-900 leading-none text-xl mt-1 capitalize ">
                  {data.title}
                </h1>
                <div className="max-w-full">
                  <p className="text-base font-medium tracking-wide text-gray-600 mt-1 overflow-clip">
                    {data.description}
                  </p>
                </div>
                <div className="flex items-center space-x-1 mt-5 space-x-2  ">
                  <div>
                    <p className="text-gray-500 font-semibold text-sm inline-block ">
                      {data.publishedAt}
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

                  {/* <a
                    href={data.url}
                    target="_blank"
                    className="py-2 px-4 bg-blue-500 text-white font-bold w-full text-center rounded-xl shadow-lg inline-block "
                  >
                    Leer Mas tarde
                  </a> */}
                </div>
              </div>
            ))}
          {/* {articles &&
            articles.data.map((data) => (
              <div className="p-8 bg-white">
                <img
                  className="rounded-lg w-full"
                  src={data.image}
                  alt="Sin imagen"
                />

                <p className="text-indigo-500 font-semibold text-base mt-2 inline">
                  {data.author}
                </p>

                <h1 className="font-semibold text-gray-900 leading-none text-xl mt-1 capitalize ">
                  {data.title}
                </h1>

                <div className="max-w-full">
                  <p className="text-base font-medium tracking-wide text-gray-600 mt-1 overflow-clip">
                    {data.description}
                  </p>
                </div>
                <div className="flex items-center space-x-1 mt-5 space-x-2  ">
                  <div>
                    <p className="text-gray-500 font-semibold text-sm inline-block ">
                      {data.publishedAt}
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
                    href={data.url}
                    target="_blank"
                    className="py-2 px-4 bg-blue-500 text-white font-bold w-full text-center rounded-xl shadow-lg inline-block "
                  >
                    Leer Mas tarde
                  </a>
                </div>
              </div>
            ))} */}
        </div>
      )}
    </div>
  );
}
