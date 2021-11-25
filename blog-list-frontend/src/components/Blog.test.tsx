import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, act } from "@testing-library/react";

import Blog from "./Blog";

const blog = {
  title: "OOP vs FP",
  author: "Uncle Bob",
  url: "cleancoders.com",
  likes: 100,
  id: "123456789",
  user: {
    name: "Anh Tu Mai",
    username: "anhtumai",
    id: "987654321",
  },
};

async function dummyHandleLike(blog: IBlog) {}

async function dummyHandleDelete(blog: IBlog) {}

test("only title and author are shown by default", () => {
  const component = render(
    <Blog
      blog={blog}
      handleLike={dummyHandleLike}
      handleDelete={dummyHandleDelete}
      owned
    />
  );
  expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`);

  for (const text of [blog.url, `likes ${blog.likes}`, blog.user.name]) {
    const element = component.getByText(text);
    expect(element).not.toBeVisible();
  }
});

test("url, likes, user name will be shown after clicking view button", () => {
  const component = render(
    <Blog
      blog={blog}
      handleLike={dummyHandleLike}
      handleDelete={dummyHandleDelete}
      owned
    />
  );
  const toggleButton = component.getByText("view");
  fireEvent.click(toggleButton);

  for (const text of [blog.url, `likes ${blog.likes}`, blog.user.name]) {
    const element = component.getByText(text);
    expect(element).toBeVisible();
  }
});

test("if the like button is clicked twice, the event handler the component received as props is called twice", () => {
  const mockHandler = jest.fn();

  const component = render(
    <Blog
      blog={blog}
      handleLike={mockHandler}
      handleDelete={dummyHandleDelete}
      owned
    />
  );

  const likeButton = component.getByTestId("like-btn");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
