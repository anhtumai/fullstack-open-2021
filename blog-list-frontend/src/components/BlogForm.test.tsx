import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, act } from "@testing-library/react";

import BlogForm from "./BlogForm";

test("create new blog with blog form", async () => {
  const submittedInfo = {
    title: "OOP vs FP",
    author: "Uncle Bob",
    url: "cleancoders.com"
  };

  const createBlog = jest.fn();

  const component = render(<BlogForm handleSubmit={createBlog}></BlogForm>);

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");

  const form = component.getByTestId("blog-form");

  fireEvent.change(title as Element, {
    target: { value: submittedInfo.title }
  });

  fireEvent.change(author as Element, {
    target: { value: submittedInfo.author }
  });

  fireEvent.change(url as Element, {
    target: { value: submittedInfo.url }
  });

  await act(async () => {
    fireEvent.submit(form);
  });

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual(submittedInfo);
});
