import PropTypes from "prop-types";

import Blog from "./Blog";

interface IBlogsProps {
  blogs: IBlog[];
  handleLike(blog: IBlog): Promise<void>;
  handleDelete(blog: IBlog): Promise<void>;
  user: IUserWithToken;
}

const Blogs = ({ blogs, handleLike, handleDelete, user }: IBlogsProps) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          owned={user.username === blog.user.username}
        />
      ))}
    </div>
  );
};

Blogs.propTypes = {
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blogs;
