import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";

import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import SpinnerApp from "../../Components/Spinner/SpinnerApp";
import FormNews from "./FormNews";
import { useCurrentUser } from "../../Contex/UserContext";
import NewsCard from "../../Components/Card/NewsCard";
import _ from "lodash";

const initialFormState = {
  id: "",
  title: "",
  description: "",
  imgUrl: "",
  MetaData: "",
};

export default function ListNews() {
  const [isLoading, setIsLoading] = useState(true);
  const [listnews, setListnews] = useState(false);
  const [editNews, setEditNews] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [seletedFile, setSeletedFile] = useState(null);
  const [updateNews, setUpdateNews] = useState(false);

  const { user } = useCurrentUser();
  async function getNews() {
    setIsLoading(true);
    const listNews = await API.graphql({ query: queries.listNewss });
    setListnews(listNews.data.listNewss.items);
    setIsLoading(false);
  }

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    if (updateNews) {
      uploadChancesNews();
    }
  }, [updateNews]);

  function onChange(e) {
    e.persist();
    setFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }

  function editNewsChange(data) {
    let newsToEdit = {
      id: data.id,
      title: data.title,
      description: data.description,
      imgUrl: data.imgUrl,
      MetaData: data.MetaData,
    };
    setFormState(newsToEdit);
    setEditNews(true);
  }

  const selectImage = (e) => {
    if (!e.target.files[0]) return;
    var file = e.target.files[0];
    setSeletedFile(file);
    var reader = new FileReader();
    /* let urlFile = URL.createObjectURL(file); */
    reader.onloadend = () => {
      setFormState(() => ({ ...formState, imgUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  async function submit() {
    const nameImage = `${user.username}/${formState.id}.jpg`;
    if (seletedFile) {
      Storage.put(nameImage, seletedFile)
        .then(async (result) => {
          console.log(result);
          const urlImage = await Storage.get(nameImage);
          setFormState(() => ({ ...formState, imgUrl: urlImage }));
          setUpdateNews(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const uploadChancesNews = () => {
    API.graphql({
      query: mutations.updateNews,
      variables: {
        input: formState,
      },
    })
      .then((data) => {
        setUpdateNews(false);
        setEditNews(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function cancel() {
    setFormState(initialFormState);
    setEditNews(false);
  }

  async function deleteNews({ id }) {
    const newNewsArray = listnews.filter((news) => news.id !== id);
    console.log(newNewsArray);
    setListnews(newNewsArray);
    let result = await API.graphql({
      query: mutations.deleteNews,
      variables: { input: { id } },
    });
    console.log(result);
  }

  return (
    <div>
      {isLoading && <SpinnerApp />}

      {editNews ? (
        <FormNews
          formState={formState}
          onChange={onChange}
          selectImage={selectImage}
          submit={submit}
          typeForm={"edit"}
          cancel={cancel}
        />
      ) : (
        <div
          className=" flex justify-center flex-wrap "
          style={{ background: "#edf2f7" }}
        >
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 mt-5 px-5">
            {!_.isEmpty(listnews) &&
              listnews.map((data, index) => (
                <div key={index}>
                  <NewsCard
                    data={data}
                    user={user}
                    saveNews={false}
                    isEditCard={true}
                  />
                  <div className=" rounded -mt-2 bg-white w-full h-10 flex justify-between shadow-md px-6 py-2 ">
                    <button
                      className="text-red-400  hover:text-red-400"
                      onClick={() => {
                        if (window.confirm("Deseas eliminar la noticia")) {
                          deleteNews(data);
                        }
                      }}
                    >
                      Eliminar
                    </button>
                    <button
                      className="text-indigo-500  hover:text-red-400"
                      onClick={() => {
                        editNewsChange(data);
                      }}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
