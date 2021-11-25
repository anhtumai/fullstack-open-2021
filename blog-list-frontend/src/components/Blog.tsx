import { useState } from "react";
import PropTypes from "prop-types";

interface IBlogProps {
  blog: IBlog;
  handleLike(blog: IBlog): Promise<void>;
  handleDelete(blog: IBlog): Promise<void>;
  owned: boolean;
}

const Blog = ({ blog, handleLike, handleDelete, owned }: IBlogProps) => {
  const [expand, setExpand] = useState(false);

  const showWhenVisible = { display: expand ? "" : "none" };

  const removeButtonStyle = {
    display: owned ? "" : "none",
    backgroundColor: "#008CBA",
  };

  async function handleDeleteBlog(): Promise<void> {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await handleDelete(blog);
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    lineHeight: "2px",
  };

  return (
    <div data-testid="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button
          data-testid="blog-toggle-btn"
          id="toggleButton"
          type="button"
          onClick={() => setExpand(!expand)}
        >
          <small>{expand ? "hide" : "view"}</small>
        </button>
      </div>
      <div style={showWhenVisible}>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          <span data-testid="like">likes {blog.likes}</span>
          <button
            data-testid="like-btn"
            type="button"
            onClick={() => handleLike(blog)}
          >
            <small>like</small>
          </button>
        </p>
        <p>{blog.user.name}</p>
        <button
          data-testid="remove-btn"
          type="button"
          style={removeButtonStyle}
          onClick={handleDeleteBlog}
        >
          <small>remove</small>
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    likes: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  owned: PropTypes.bool.isRequired,
};

export default Blog;
