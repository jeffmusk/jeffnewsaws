import React, { useState } from "react";
import { API } from "aws-amplify";

import * as mutations from "../../graphql/mutations";
import { AmplifyLoadingSpinner } from "@aws-amplify/ui-react";
import { toast } from "react-toastify";
import FormNews from "./FormNews";

const CustomToast = (title, message) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{message} </p>
    </div>
  );
};

const initialFormState = {
  title: "",
  description: "",
  imgUrl: "",
  MetaData: "default",
};
export default function News() {
  const [formState, setFormState] = useState(initialFormState);
  const [isCreating, setIsCreating] = useState(false);

  function onChange(e) {
    e.persist();
    setFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }

  async function submit() {
    toast(CustomToast("creando news", "estamos creando la noticia"), {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    setIsCreating(true);
    const newNotices = await API.graphql({
      query: mutations.createNews,
      variables: {
        input: formState,
      },
    });
    console.log(newNotices);
    setIsCreating(false);
    setFormState(initialFormState);
  }

  return isCreating ? (
    <AmplifyLoadingSpinner />
  ) : (
    <FormNews
      formState={formState}
      onChange={onChange}
      submit={submit}
      typeForm={"create"}
    />
  );
}
