import React, { useState, useEffect, useRef } from "react";

import "./index.css";

import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import LoginBanner from "./components/LoginBanner";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [user, setUser] = useState<IUserWithToken | null>(null);

  const blogFormRef = useRef<{ toggleVisibility(): void }>(null);

  useEffect(() => {
    (async () => {
      const result = await blogService.getAll();
      setBlogs(result);
    })();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const loggedUser: IUserWithToken = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      blogService.setToken(null);
    } else {
      blogService.setToken(user.token);
    }
  }, [user]);

  useEffect(() => {
    if (successMessage) setTimeout(() => setSuccessMessage(null), 5000);
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) setTimeout(() => setErrorMessage(null), 5000);
  }, [errorMessage]);

  async function handleLogin(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

      setUser(loggedUser);
      setSuccessMessage(`${loggedUser.username} logged in successfully`);
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        setErrorMessage("Wrong username or password");
      } else {
        setErrorMessage("Fail to login");
      }
    } finally {
      setUsername("");
      setPassword("");
    }
  }

  function handleLogout() {
    window.localStorage.removeItem("loggedUser");

    setUser(null);
    setSuccessMessage(`Log out successfully`);
  }

  async function handleNewBlogSubmit(submittedInfo: IBlogFormInfo) {
    if (!user) return;

    if (blogFormRef.current) blogFormRef.current.toggleVisibility();

    try {
      const result = await blogService.create({ ...submittedInfo });

      const updatedBlog = {
        ...result,
        user: { name: user.name, username: user.username, id: result.user },
      };

      setBlogs(blogs.concat(updatedBlog));
      setSuccessMessage(
        `a new blog ${updatedBlog.title} by ${updatedBlog.author} added`
      );
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        setErrorMessage("Submitted information is invalid");
      } else {
        setErrorMessage("Fail to create new blog");
      }
    }
  }

  async function handleLike(selectedBlog: IBlog) {
    const { author, title, url, id } = selectedBlog;
    const updatedBlog = {
      id,
      title,
      author,
      url,
      likes: selectedBlog.likes + 1,
    };
    try {
      const result = await blogService.update(updatedBlog);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === result.id ? { ...blog, likes: result.likes } : blog
      );
      setBlogs(updatedBlogs);
    } catch (err) {
      console.log(err);
      setErrorMessage("Fail to update likes");
    }
  }

  async function handleDelete(deletedBlog: IBlog) {
    try {
      await blogService.remove(deletedBlog.id);
      const updatedBlogs = blogs.filter((blog) => blog.id !== deletedBlog.id);
      setBlogs(updatedBlogs);
      setSuccessMessage(`Remove ${deletedBlog.title} by ${deletedBlog.author}`);
    } catch (err) {
      console.log(err);
      if (err.response.status === 403) {
        setErrorMessage(`User has no permission to delete this blog`);
      } else {
        setErrorMessage("Fail to delete blog");
      }
    }
  }

  const body =
    user === null ? (
      <LoginForm
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePassworChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
      />
    ) : (
      <div>
        {" "}
        <LoginBanner name={user.name} handleLogout={handleLogout} />
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm handleSubmit={handleNewBlogSubmit} />
        </Togglable>
        <br />
        <Blogs
          blogs={blogs.sort((blog1, blog2) =>
            blog1.likes < blog2.likes ? 1 : -1
          )}
          handleLike={handleLike}
          handleDelete={handleDelete}
          user={user}
        />{" "}
      </div>
    );
  return (
    <div>
      <Notification message={successMessage} state="success" />
      <Notification message={errorMessage} state="error" />
      {body}
    </div>
  );
};

export default App;
