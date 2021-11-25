import React, { useState } from "react";
import PropTypes from "prop-types";

import InputWithLabel from "./InputWithLabel";

interface IBlogFormProps {
  handleSubmit(submittedInfo: IBlogFormInfo): Promise<void>;
}

const BlogForm = ({ handleSubmit }: IBlogFormProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  function resetInputFields() {
    setTitle("");
    setAuthor("");
    setUrl("");
  }
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const submittedInfo = { title, author, url };
    resetInputFields();
    await handleSubmit(submittedInfo);
  }

  return (
    <div>
      <h3>Add a new:</h3>
      <form data-testid="blog-form" onSubmit={onSubmit}>
        <InputWithLabel
          htmlFor="title"
          value={title}
          onInputChange={(e) => setTitle(e.target.value)}
        >
          <span>title: </span>
        </InputWithLabel>
        <br />
        <InputWithLabel
          htmlFor="author"
          value={author}
          onInputChange={(e) => setAuthor(e.target.value)}
        >
          <span>author: </span>
        </InputWithLabel>
        <br />
        <InputWithLabel
          htmlFor="url"
          value={url}
          onInputChange={(e) => setUrl(e.target.value)}
        >
          <span>url: </span>
        </InputWithLabel>{" "}
        <div>
          <button data-testid="blog-submit-btn" type="submit">
            create
          </button>
        </div>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default BlogForm;
