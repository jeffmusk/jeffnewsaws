import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../Contex/UserContext";
import SpinnerApp from "../../Components/Spinner/SpinnerApp";
import axios from "axios";

export default function Home() {
  const { user } = useCurrentUser();
  const apiKey = process.env.REACT_APP_API_KEY_NEWSAPI;
  const [articles, setArticles] = useState({});
  const [loading, setLoading] = useState(true);

  async function getNewsFromApi() {
    axios
      .get(`https://newsapi.org/v2/top-headlines?country=co&apiKey=${apiKey}`)
      .then((res) => {
        setArticles(res.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    getNewsFromApi();
  }, []);

  return (
    <div>
      {loading ? (
        <SpinnerApp />
      ) : (
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 mt-5 px-5 bg-gray-100 py-2">
          {articles &&
            articles.map((data) => (
              <div className="p-8 bg-white" key={data.publishedAt}>
                <a href={data.url}>
                  <img
                    className="rounded-lg w-full"
                    src={data.urlToImage}
                    alt="Sin imagen"
                  />
                </a>

                <p className="text-indigo-500 font-semibold text-base mt-2">
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
                <div className="flex items-center space-x-1 mt-5">
                  <div>
                    <p className="text-gray-500 font-semibold text-sm">
                      data.createdAt
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mt-5 grid-cols-2">
                  <button
                    className="py-2 px-4 bg-blue-500 text-white font-bold w-full  rounded-xl shadow-lg"
                    onClick={() => {
                      console.log("leer mas tarde");
                    }}
                  >
                    Leer Mas tarde
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
