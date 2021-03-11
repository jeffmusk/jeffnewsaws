import React, { useEffect, useState, useRef, useReducer } from "react";
import { Paper, Grid, Box } from "@material-ui/core";
import _ from "lodash";
import { AmplifyLoadingSpinner } from "@aws-amplify/ui-react";
import { toast } from "react-toastify";
import { API } from "aws-amplify";
import { useInView } from "react-intersection-observer";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { useCurrentUser } from "../../Contex/UserContext";
import * as mutations from "../../graphql/mutations";
import newsReducer from "../../CustomUseReducer/newReducer";
import { getNews } from "../../Services/news.api";
import { AppStyles } from "./HomeStyle";
import NewsCard from "../../Components/Card/NewsCard";

const Home = () => {
  const { user } = useCurrentUser();
  const [category, setCategory] = useState("Technology");
  const newsRef = useRef();
  const classes = AppStyles();
  const [news, newsDispatch] = useReducer(newsReducer, {
    page: 0,
    articles: [],
    isLazy: true,
  });

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  /* scroll inifinito*/
  useEffect(() => {
    if (inView && !news.isLazy) {
      console.log("cargando nuevas fotos...");
      newsDispatch({ type: "INCREASE_PAGE" });
    }
  }, [inView]);

  /* Custom suscribed */
  useEffect(() => {
    let isSuscribed = true;

    getNews(news.page, category)
      .then((articles) => {
        console.log(articles);
        if (isSuscribed) newsDispatch({ type: "SET_ARTICLES", articles });
        console.log("agregados elementos");
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isSuscribed = false;
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
      <Grid container className={classes.root} spacing={5}>
        <Grid item xs={12}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <div className={classes.newsGrid}>
              <Masonry>
                {!_.isEmpty(news.articles) &&
                  news.articles.map((data, index) => (
                    <Grid key={index} item>
                      <NewsCard data={data} user={user} saveNews={saveNews} />
                    </Grid>
                  ))}
              </Masonry>
            </div>
          </ResponsiveMasonry>

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
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
