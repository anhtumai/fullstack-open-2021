import { useHistory } from "react-router";

import Input from "./Input";
import { useField } from "../hooks/index";

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const history = useHistory();

  const resetInputFields = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetInputFields();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <Input text="content" name="content" field={content} />
        <Input text="author" name="author" field={author} />
        <Input text="url for more info" name="info" field={info} />
        <span>
          <button type="submit">create</button>
          <button type="button" onClick={resetInputFields}>
            reset
          </button>
        </span>
      </form>
    </div>
  );
};

export default CreateNew;
