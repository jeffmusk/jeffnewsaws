import React, { useEffect, useState, useRef, useReducer } from "react";
import { useCurrentUser } from "../../Contex/UserContext";
import SpinnerApp from "../../Components/Spinner/SpinnerApp";
import { Paper, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import _ from "lodash";
import { AmplifyLoadingSpinner } from "@aws-amplify/ui-react";

import { API } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import { toast } from "react-toastify";
import NewsCard from "../../Components/NewsCard/NewsCard";
import newsReducer from "../../CustomUseReducer/newReducer";
import { getNews } from "../../Services/news.api";
import { AppStyles } from "./HomeStyle";

const Home = () => {
  const { user } = useCurrentUser();
  const [category, setCategory] = useState("Home");
  const newsRef = useRef();
  const classes = AppStyles();
  const [news, newsDispatch] = useReducer(newsReducer, {
    page: 0,
    articles: [],
    isLazy: true,
  });

  useEffect(() => {
    const { current } = newsRef;
    console.log(current);
    if (current) {
      current.onscroll = (e) => {
        const { scrollHeight, scrollTop, clientHeight } = e.target;
        if (scrollHeight - (scrollTop + clientHeight) < 100 && !news.isLazy)
          newsDispatch({ type: "INCREASE_PAGE" });
      };
    }
  }, [news.isLazy]);

  /* Custom suscribed */

  useEffect(() => {
    let isSuscribed = true;

    getNews(news.page, category)
      .then((articles) => {
        console.log(articles);
        if (isSuscribed) newsDispatch({ type: "SET_ARTICLES", articles });
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
      <Grid item xs={12} md={4} lg={3} className={classes.newsGrid}>
        <Box
          component={Paper}
          square
          className={classes.newsWrapper}
          ref={newsRef}
        >
          {news.articles.length > 0 &&
            news.articles.map((data, index) => (
              <Grid key={index} item xs>
                <NewsCard data={data} user={user} saveNews={saveNews} />
              </Grid>
            ))}

          {(_.isEmpty(news.articles) || news.isLazy) && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              <AmplifyLoadingSpinner />
            </div>
          )}
        </Box>
      </Grid>
    </div>
  );
};

export default Home;
