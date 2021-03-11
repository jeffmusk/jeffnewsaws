import React, { useEffect, useState, useRef, useReducer } from "react";
import { useCurrentUser } from "../../Contex/UserContext";
import SpinnerApp from "../../Components/Spinner/SpinnerApp";

import axios from "axios";
import { API } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import { toast } from "react-toastify";
import NewsCard from "../../Components/NewsCard/NewsCard";
import newsReducer from "../../CustomUseReducer/newReducer";

const apiNyTimes = axios.create({
  baseURL: "https://api.nytimes.com/svc/search/v2/",
});

export default function Home() {
  const { user } = useCurrentUser();
  const [category, setCategory] = useState("Home");
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);

  const newsRef = useRef();
  const [news, newsDispatch] = useReducer(newsReducer, {
    page: 0,
    articles: [],
    isLazy: true,
  });

  const getNews = async (page) => {
    try {
      const { data } = await apiNyTimes.get("/articlesearch.json", {
        params: {
          fq: `news_desk:(${category})`,
          "api-key": process.env.REACT_APP_API_KEY_NYTIMES,
          sort: "newest",
          page,
        },
      });
      console.log(data.response.docs);
      setArticles(data.response.docs);
      setLoading(false);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getNews(1);
    console.log("key api", process.env.REACT_APP_API_KEY_NYTIMES);
  }, []);

  function getScroll(e) {
    if (document.documentElement.scrollTop > 200) {
      console.log("mayor a 200 ");
      console.log(document.documentElement.scrollTop);
    }
  }

  useEffect(() => {
    window.onscroll = () => {
      getScroll();
    };
  }, []);

  async function saveNews(data) {
    let newNotice = {
      title: data.abstract,
      description: data.lead_paragraph,
      imgUrl:
        data.multimedia.length > 0
          ? `https://www.nytimes.com/${data.multimedia[0]?.url}`
          : "https://www.freeiconspng.com/uploads/no-image-icon-13.png",
      url: data.web_url,
      author: data.source,
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

  return (
    <div>
      {loading ? (
        <SpinnerApp />
      ) : (
        <div
          className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 mt-5 px-5 bg-gray-100 py-2"
          ref={newsRef}
        >
          {articles &&
            articles.map((data, index) => (
              <div key={index}>
                <NewsCard data={data} user={user} saveNews={saveNews} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
