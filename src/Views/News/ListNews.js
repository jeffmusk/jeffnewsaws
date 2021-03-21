import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";

import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import SpinnerApp from "../../Components/Spinner/SpinnerApp";
import FormNews from "./FormNews";
import { useCurrentUser } from "../../Contex/UserContext";
import NewsCard from "../../Components/Card/NewsCard";
import _ from "lodash";
import awsExports from "../../aws-exports";

const initialFormState = {
  id: "",
  title: "",
  description: "",
  imgUrl: "",
  MetaData: "",
  nameFile: null,
  file: null,
};

export default function ListNews() {
  const [isLoading, setIsLoading] = useState(true);
  const [listnews, setListnews] = useState(false);
  const [editNews, setEditNews] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [selectedFile, setSelectedFile] = useState(null);

  const { user } = useCurrentUser();
  async function getNews() {
    setIsLoading(true);
    const listNews = await API.graphql({ query: queries.listNewss });
    const newsFromApi = listNews.data.listNewss.items;

    await Promise.all(
      newsFromApi.map(async (note) => {
        if (note.file) {
          const image = await Storage.get(note.nameFile, {
            bucket: note.file.bucket,
            region: note.file.region,
            key: note.file.key,
          });
          note.imgUrl = image;
        }
        return note;
      })
    );

    setListnews(newsFromApi);
    setIsLoading(false);
    console.log(listNews.data.listNewss.items);
  }

  useEffect(() => {
    getNews();
  }, []);

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
    const nameImage = `${user.username}/${formState.id}.jpg`;
    let file = e.target.files[0];
    console.log(file);
    if (file) {
      Storage.put(nameImage, file, {
        contentType: "image/jpg",
      }).then((res) => {
        let localUrl = URL.createObjectURL(file);
        let image = {
          bucket: awsExports.aws_user_files_s3_bucket,
          region: awsExports.aws_user_files_s3_bucket_region,
          key: "public/" + nameImage,
        };
        setFormState(() => ({
          ...formState,
          file: image,
          nameFile: nameImage,
        }));
        setSelectedFile(localUrl);

        console.log(image);
        console.log(res);
      });
    }
  };

  async function submit() {
    console.log(formState);
    uploadChancesNews(formState);
    /* const nameImage = `${user.username}/${formState.id}.jpg`;
    if (selectedFile) {
      Storage.put(nameImage, selectedFile)
        .then(async (result) => {
          console.log(result);
          const urlImage = await Storage.get(nameImage);
          setFormState(() => ({ ...formState, imgUrl: urlImage }));
          uploadChancesNews();
        })
        .catch((err) => {
          console.log(err);
        });
    } */
  }

  const uploadChancesNews = (formState) => {
    API.graphql({
      query: mutations.updateNews,
      variables: {
        input: formState,
      },
    })
      .then((data) => {
        console.log("noticia actualizada");
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
    try {
      await API.graphql({
        query: mutations.deleteNews,
        variables: { input: { id } },
      });
    } catch (err) {
      console.log("No fu posible eliminar la noticia");
      console.log(err);
    }
  }

  return (
    <div>
      {isLoading && <SpinnerApp />}

      {editNews ? (
        <FormNews
          formState={formState}
          onChange={onChange}
          selectImage={selectImage}
          selectedFile={selectedFile}
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
                  <div className=" rounded -mt-2 bg-white w-full h-10 flex justify-between shadow-md px-6 py-2   ">
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
