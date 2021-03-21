import React, { useEffect, useState, useReducer } from "react";
import "./HomeStyle.css";

import _ from "lodash";
import { AmplifyLoadingSpinner } from "@aws-amplify/ui-react";
import { toast } from "react-toastify";
import { API } from "aws-amplify";
import { useInView } from "react-intersection-observer";

import { useCurrentUser } from "../../Contex/UserContext";
import * as mutations from "../../graphql/mutations";
import newsReducer from "../../CustomUseReducer/newReducer";
import { getNews } from "../../Services/news.api";
import NewsCard from "../../Components/Card/NewsCard";

const Home = () => {
  const { user } = useCurrentUser();
  const [category, setCategory] = useState("Technology");

  const [news, newsDispatch] = useReducer(newsReducer, {
    page: 0,
    articles: [],
    isLazy: true,
  });

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  /* scroll infinito*/
  useEffect(() => {
    if (inView && !news.isLazy) {
      console.log("cargando nuevas fotos...");
      newsDispatch({ type: "INCREASE_PAGE" });
    }
  }, [inView]);

  /* Custom subscribed */
  useEffect(() => {
    let isSubscribed = true;

    getNews(news.page, category)
      .then((articles) => {
        console.log(articles);
        if (isSubscribed) newsDispatch({ type: "SET_ARTICLES", articles });
        console.log("agregados elementos");
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isSubscribed = false;
    };
  }, [news.page]);

  async function saveNews(data) {
    let newNotice = {
      title: data.headline.main,
      description: data.abstract,
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
      <div className="flex flex-row flex-wrap mx-auto justify-center space-x-4 bg-gray-100 pt-5 ">
        {!_.isEmpty(news.articles) &&
          news.articles.map((data, index) => (
            <div key={index}>
              <NewsCard
                data={data}
                user={user}
                saveNews={saveNews}
                isEditCard={false}
              />
            </div>
          ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "25px",
        }}
        ref={ref}
      >
        <AmplifyLoadingSpinner />
      </div>
    </div>
  );
};

export default Home;
