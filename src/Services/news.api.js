import axios from "axios";

const apiNyTimes = axios.create({
  baseURL: "https://api.nytimes.com/svc/search/v2/",
});

export const getNews = async (page, category) => {
  try {
    const { data } = await apiNyTimes.get("/articlesearch.json", {
      params: {
        fq: `news_desk:(${category})`,
        "api-key": process.env.REACT_APP_API_KEY_NYTIMES,
        sort: "newest",
        page,
      },
    });
    return data.response.docs;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
